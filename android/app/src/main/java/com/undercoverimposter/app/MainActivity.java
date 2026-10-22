package com.undercoverimposter.app;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.widget.RelativeLayout;
import android.view.View;
import android.widget.Toast;

import com.inmobi.ads.AdMetaInfo;
import com.inmobi.ads.InMobiAdRequestStatus;
import com.inmobi.ads.InMobiBanner;
import com.inmobi.ads.InMobiInterstitial;
import com.inmobi.ads.listeners.BannerAdEventListener;
import com.inmobi.ads.listeners.InterstitialAdEventListener;
import com.inmobi.sdk.InMobiSdk;
import com.inmobi.sdk.SdkInitializationListener;

public class MainActivity extends Activity {
    private static final String TAG = "UndercoverAds";
    private static final String INMOBI_ACCOUNT_ID = "cedbb817c38d4fae9b5cdef90f8d2f16";
    private static final long BANNER_PLACEMENT_ID = 10000849829L;
    private static final long INTERSTITIAL_PLACEMENT_ID = 10000849831L;
    private static final long REWARDED_PLACEMENT_ID = 10000849838L;

    private WebView webView;
    private InMobiBanner bannerAd;
    private InMobiInterstitial interstitialAd;
    private InMobiInterstitial rewardedAd;
    private boolean interstitialReady = false;
    private boolean rewardedReady = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        RelativeLayout layout = new RelativeLayout(this);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new AdsBridge(), "AndroidAds");

        RelativeLayout.LayoutParams webParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT);
        webParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
        webParams.addRule(RelativeLayout.ABOVE, View.generateViewId());
        layout.addView(webView, webParams);

        final int bannerContainerId = View.generateViewId();
        RelativeLayout.LayoutParams bannerParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT, dp(50));
        bannerParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        View bannerSpace = new View(this);
        bannerSpace.setId(bannerContainerId);
        layout.addView(bannerSpace, bannerParams);

        setContentView(layout);
        webView.loadUrl("file:///android_asset/game.html");

        InMobiSdk.init(this, INMOBI_ACCOUNT_ID, null, new SdkInitializationListener() {
            @Override
            public void onInitializationComplete(@androidx.annotation.Nullable Error error) {
                if (error != null) {
                    Log.e(TAG, "InMobi initialization failed: " + error.getMessage());
                    return;
                }
                Log.i(TAG, "InMobi initialized");
                runOnUiThread(() -> initializeAds(layout, bannerContainerId));
            }
        });
    }

    private void initializeAds(RelativeLayout layout, int bannerContainerId) {
        bannerAd = new InMobiBanner(this, BANNER_PLACEMENT_ID);
        bannerAd.setListener(new BannerAdEventListener() {
            @Override
            public void onAdLoadSucceeded(InMobiBanner ad, AdMetaInfo info) {
                Log.d(TAG, "Banner loaded");
            }

            @Override
            public void onAdFetchFailed(InMobiBanner ad, InMobiAdRequestStatus status) {
                Log.w(TAG, "Banner failed: " + status.getMessage());
            }
        });
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT, dp(50));
        params.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        params.addRule(RelativeLayout.CENTER_HORIZONTAL);
        layout.addView(bannerAd, params);
        bannerAd.load();

        interstitialAd = new InMobiInterstitial(this, INTERSTITIAL_PLACEMENT_ID,
                new InterstitialAdEventListener() {
                    @Override
                    public void onAdLoadSucceeded(InMobiInterstitial ad, AdMetaInfo info) {
                        interstitialReady = true;
                        Log.d(TAG, "Interstitial ready");
                    }

                    @Override
                    public void onAdLoadFailed(InMobiInterstitial ad, InMobiAdRequestStatus status) {
                        interstitialReady = false;
                        Log.w(TAG, "Interstitial failed: " + status.getMessage());
                    }

                    @Override
                    public void onAdDismissed(InMobiInterstitial ad) {
                        interstitialReady = false;
                        ad.load();
                    }

                    @Override
                    public void onAdDisplayFailed(InMobiInterstitial ad) {
                        interstitialReady = false;
                        ad.load();
                    }
                });
        interstitialAd.load();

        rewardedAd = new InMobiInterstitial(this, REWARDED_PLACEMENT_ID,
                new InterstitialAdEventListener() {
                    @Override
                    public void onAdLoadSucceeded(InMobiInterstitial ad, AdMetaInfo info) {
                        rewardedReady = true;
                        Log.d(TAG, "Rewarded ad ready");
                    }

                    @Override
                    public void onAdLoadFailed(InMobiInterstitial ad, InMobiAdRequestStatus status) {
                        rewardedReady = false;
                        Log.w(TAG, "Rewarded ad failed: " + status.getMessage());
                    }

                    @Override
                    public void onAdDismissed(InMobiInterstitial ad) {
                        rewardedReady = false;
                        ad.load();
                    }

                    @Override
                    public void onAdDisplayFailed(InMobiInterstitial ad) {
                        rewardedReady = false;
                        ad.load();
                    }

                    @Override
                    public void onRewardsUnlocked(InMobiInterstitial ad, java.util.Map<Object, Object> rewards) {
                        runOnUiThread(() -> {
                            if (webView != null) {
                                webView.evaluateJavascript(
                                        "window.onInMobiRewardEarned && window.onInMobiRewardEarned(" +
                                        org.json.JSONObject.quote(rewards.toString()) + ");", null);
                            }
                        });
                    }
                });
        rewardedAd.load();
    }

    private int dp(int value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    private class AdsBridge {
        @JavascriptInterface
        public void showInterstitial() {
            runOnUiThread(() -> {
                if (interstitialAd != null && interstitialReady && interstitialAd.isReady()) {
                    interstitialReady = false;
                    interstitialAd.show();
                } else {
                    Log.d(TAG, "Interstitial not ready; continuing game");
                }
            });
        }

        @JavascriptInterface
        public void showRewarded() {
            runOnUiThread(() -> {
                if (rewardedAd != null && rewardedReady && rewardedAd.isReady()) {
                    rewardedReady = false;
                    rewardedAd.show();
                } else {
                    Toast.makeText(MainActivity.this, "Reward ad is not ready yet. Please try again.", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (bannerAd != null) bannerAd.resume();
    }

    @Override
    protected void onPause() {
        if (bannerAd != null) bannerAd.pause();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        if (bannerAd != null) {
            bannerAd.destroy();
            bannerAd = null;
        }
        webView = null;
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
