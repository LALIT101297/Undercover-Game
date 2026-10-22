package com.undercoverimposter.app;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.RelativeLayout;

import com.inmobi.sdk.InMobiSdk;
import com.inmobi.sdk.SdkInitializationListener;
import com.inmobi.ads.AdMetaInfo;
import com.inmobi.ads.InMobiAdRequestStatus;
import com.inmobi.ads.InMobiBanner;
import com.inmobi.ads.InMobiInterstitial;
import com.inmobi.ads.listeners.BannerAdEventListener;
import com.inmobi.ads.listeners.InterstitialAdEventListener;

import java.util.Map;

public class MainActivity extends Activity {
    private static final String TAG = "UndercoverImposter";
    private static final String INMOBI_ACCOUNT_ID = "cedbb817c38d4fae9b5cdef90f8d2f16";
    private static final long BANNER_PLACEMENT_ID = 10000849829L;
    private static final long INTERSTITIAL_PLACEMENT_ID = 10000849831L;
    private static final long REWARDED_PLACEMENT_ID = 10000849838L;

    private WebView webView;
    private InMobiBanner bannerAd;
    private InMobiInterstitial interstitialAd;
    private InMobiInterstitial rewardedAd;
    private RelativeLayout rootLayout;
    private boolean sdkReady = false;
    private boolean rewardedAdReady = false;
    private final Handler adHandler = new Handler(Looper.getMainLooper());
    private int bannerRetryCount = 0;
    private int interstitialRetryCount = 0;
    private int rewardedRetryCount = 0;
    private static final int MAX_AD_RETRIES = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        rootLayout = new RelativeLayout(this);
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
        webParams.addRule(RelativeLayout.ABOVE, 1001);
        rootLayout.addView(webView, webParams);
        setContentView(rootLayout);
        webView.loadUrl("file:///android_asset/game.html");

        InMobiSdk.init(this, INMOBI_ACCOUNT_ID, null, new SdkInitializationListener() {
            @Override
            public void onInitializationComplete(Error error) {
                if (error != null) {
                    Log.e(TAG, "InMobi initialization failed: " + error.getMessage());
                    return;
                }
                sdkReady = true;
                Log.d(TAG, "InMobi initialized successfully");
                runOnUiThread(() -> {
                    loadBanner();
                    prepareInterstitial();
                    prepareRewardedAd();
                });
            }
        });
    }

    private void loadBanner() {
        if (isFinishing() || isDestroyed() || bannerAd != null) return;
        bannerAd = new InMobiBanner(this, BANNER_PLACEMENT_ID);
        bannerAd.setListener(new BannerAdEventListener() {
            @Override
            public void onAdLoadSucceeded(InMobiBanner ad, AdMetaInfo info) {
                bannerRetryCount = 0;
                Log.d(TAG, "Banner loaded");
            }
            @Override
            public void onAdLoadFailed(InMobiBanner ad, InMobiAdRequestStatus status) {
                Log.w(TAG, "Banner failed: " + status.getMessage());
                scheduleBannerRetry();
            }
            @Override
            public void onAdClicked(InMobiBanner ad, Map map) { }
            @Override
            public void onAdDisplayed(InMobiBanner ad) { }
            @Override
            public void onAdDismissed(InMobiBanner ad) { }
            @Override
            public void onUserLeftApplication(InMobiBanner ad) { }
            @Override
            public void onRewardsUnlocked(InMobiBanner ad, Map map) { }
            @Override
            public void onAdImpression(InMobiBanner ad) { }
        });

        int heightPx = Math.round(50 * getResources().getDisplayMetrics().density);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT, heightPx);
        params.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        params.addRule(RelativeLayout.CENTER_HORIZONTAL);
        bannerAd.setId(1001);
        rootLayout.addView(bannerAd, params);
        bannerAd.load();
    }

    private void prepareInterstitial() {
        interstitialAd = new InMobiInterstitial(this, INTERSTITIAL_PLACEMENT_ID,
                new InterstitialAdEventListener() {
            @Override
            public void onAdLoadSucceeded(InMobiInterstitial ad, AdMetaInfo info) {
                interstitialRetryCount = 0;
                Log.d(TAG, "Interstitial loaded");
            }
            @Override
            public void onAdLoadFailed(InMobiInterstitial ad, InMobiAdRequestStatus status) {
                Log.w(TAG, "Interstitial failed: " + status.getMessage());
                scheduleInterstitialRetry();
            }
            @Override
            public void onAdFetchSuccessful(InMobiInterstitial ad, AdMetaInfo info) { }
            @Override
            public void onAdClicked(InMobiInterstitial ad, Map map) { }
            @Override
            public void onAdWillDisplay(InMobiInterstitial ad) { }
            @Override
            public void onAdDisplayed(InMobiInterstitial ad, AdMetaInfo info) { }
            @Override
            public void onAdDisplayFailed(InMobiInterstitial ad) {
                Log.w(TAG, "Interstitial display failed");
                scheduleInterstitialRetry();
            }
            @Override
            public void onAdDismissed(InMobiInterstitial ad) {
                adHandler.postDelayed(() -> { if (!isFinishing() && !isDestroyed()) ad.load(); }, 1500);
            }
            @Override
            public void onUserLeftApplication(InMobiInterstitial ad) { }
            @Override
            public void onRewardsUnlocked(InMobiInterstitial ad, Map map) { }
            @Override
            public void onAdImpression(InMobiInterstitial ad) { }
        });
        interstitialAd.load();
    }

    private void prepareRewardedAd() {
        rewardedAdReady = false;
        rewardedAd = new InMobiInterstitial(this, REWARDED_PLACEMENT_ID,
                new InterstitialAdEventListener() {
            @Override
            public void onAdLoadSucceeded(InMobiInterstitial ad, AdMetaInfo info) {
                rewardedAdReady = true;
                rewardedRetryCount = 0;
                Log.d(TAG, "Rewarded ad loaded");
            }
            @Override
            public void onAdLoadFailed(InMobiInterstitial ad, InMobiAdRequestStatus status) {
                rewardedAdReady = false;
                Log.w(TAG, "Rewarded ad failed: " + status.getMessage());
                scheduleRewardedRetry();
            }
            @Override
            public void onAdFetchSuccessful(InMobiInterstitial ad, AdMetaInfo info) { }
            @Override
            public void onAdClicked(InMobiInterstitial ad, Map map) { }
            @Override
            public void onAdWillDisplay(InMobiInterstitial ad) { }
            @Override
            public void onAdDisplayed(InMobiInterstitial ad, AdMetaInfo info) { }
            @Override
            public void onAdDisplayFailed(InMobiInterstitial ad) {
                rewardedAdReady = false;
                scheduleRewardedRetry();
            }
            @Override
            public void onAdDismissed(InMobiInterstitial ad) {
                rewardedAdReady = false;
                adHandler.postDelayed(() -> { if (!isFinishing() && !isDestroyed()) ad.load(); }, 1500);
            }
            @Override
            public void onUserLeftApplication(InMobiInterstitial ad) { }
            @Override
            public void onRewardsUnlocked(InMobiInterstitial ad, Map map) {
                runOnUiThread(() -> {
                    if (webView != null) {
                        webView.evaluateJavascript(
                                "window.onInMobiRewardEarned && window.onInMobiRewardEarned()", null);
                    }
                });
            }
            @Override
            public void onAdImpression(InMobiInterstitial ad) { }
        });
        rewardedAd.load();
    }


    // Retry transient no-fill/network failures with capped exponential backoff.
    // Ads never block gameplay and an unavailable ad never grants a reward.
    private long retryDelayMs(int attempt) {
        return Math.min(60000L, 5000L * (1L << Math.min(attempt, 3)));
    }

    private void scheduleBannerRetry() {
        if (bannerRetryCount >= MAX_AD_RETRIES || isFinishing() || isDestroyed()) return;
        long delay = retryDelayMs(bannerRetryCount++);
        adHandler.postDelayed(() -> {
            if (bannerAd != null && !isFinishing() && !isDestroyed()) bannerAd.load();
        }, delay);
    }

    private void scheduleInterstitialRetry() {
        if (interstitialRetryCount >= MAX_AD_RETRIES || isFinishing() || isDestroyed()) return;
        long delay = retryDelayMs(interstitialRetryCount++);
        adHandler.postDelayed(() -> {
            if (interstitialAd != null && !isFinishing() && !isDestroyed()) interstitialAd.load();
        }, delay);
    }

    private void scheduleRewardedRetry() {
        rewardedAdReady = false;
        if (rewardedRetryCount >= MAX_AD_RETRIES || isFinishing() || isDestroyed()) return;
        long delay = retryDelayMs(rewardedRetryCount++);
        adHandler.postDelayed(() -> {
            if (rewardedAd != null && !isFinishing() && !isDestroyed()) rewardedAd.load();
        }, delay);
    }

    private class AdsBridge {
        @JavascriptInterface
        public void onRoundCompleted(int roundNumber) {
            runOnUiThread(() -> {
                if (sdkReady && roundNumber > 0 && roundNumber % 3 == 0
                        && interstitialAd != null && interstitialAd.isReady()) {
                    interstitialAd.show();
                }
            });
        }

        @JavascriptInterface
        public void showRewardedAd() {
            runOnUiThread(() -> {
                if (sdkReady && rewardedAd != null && rewardedAdReady && rewardedAd.isReady()) {
                    rewardedAdReady = false;
                    rewardedAd.show();
                } else if (webView != null) {
                    webView.evaluateJavascript(
                            "window.onInMobiRewardUnavailable && window.onInMobiRewardUnavailable()", null);
                }
            });
        }
    }

    @Override
    protected void onDestroy() {
        adHandler.removeCallbacksAndMessages(null);
        if (bannerAd != null) {
            bannerAd.destroy();
            bannerAd = null;
        }
        if (webView != null) {
            webView.removeJavascriptInterface("AndroidAds");
            webView.destroy();
            webView = null;
        }
        interstitialAd = null;
        rewardedAd = null;
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView != null) {
            webView.evaluateJavascript("window.pgHandleBack ? window.pgHandleBack() : false", value -> {
                if (!"true".equals(value)) MainActivity.super.onBackPressed();
            });
        } else {
            super.onBackPressed();
        }
    }
}
