package com.undercoverimposter.app;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.widget.RelativeLayout;

import com.inmobi.sdk.InMobiSdk;
import com.inmobi.sdk.SdkInitializationListener;
import com.inmobi.ads.InMobiBanner;
import com.inmobi.ads.BannerAdEventListener;
import com.inmobi.ads.AdMetaInfo;
import com.inmobi.ads.InMobiAdRequestStatus;

public class MainActivity extends Activity {
    private static final String TAG = "UndercoverImposter";
    private static final String INMOBI_ACCOUNT_ID = "cedbb817c38d4fae9b5cdef90f8d2f16";
    private static final long BANNER_PLACEMENT_ID = 10000849829L;

    private WebView webView;
    private InMobiBanner bannerAd;
    private RelativeLayout rootLayout;

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

        RelativeLayout.LayoutParams webParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT
        );
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
                Log.d(TAG, "InMobi initialized successfully");
                runOnUiThread(() -> loadBanner());
            }
        });
    }

    private void loadBanner() {
        if (isFinishing() || isDestroyed()) return;

        bannerAd = new InMobiBanner(this, BANNER_PLACEMENT_ID);
        bannerAd.setListener(new BannerAdEventListener() {
            @Override
            public void onAdLoadSucceeded(InMobiBanner ad, AdMetaInfo info) {
                Log.d(TAG, "InMobi banner loaded");
            }

            @Override
            public void onAdLoadFailed(InMobiBanner ad, InMobiAdRequestStatus status) {
                Log.w(TAG, "InMobi banner failed: " + status.getMessage());
            }
        });

        int heightPx = (int) (50 * getResources().getDisplayMetrics().density);
        RelativeLayout.LayoutParams bannerParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                heightPx
        );
        bannerParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        bannerParams.addRule(RelativeLayout.CENTER_HORIZONTAL);
        bannerParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        bannerAd.setId(1001);
        rootLayout.addView(bannerAd, bannerParams);
        bannerAd.load();
    }

    @Override
    protected void onDestroy() {
        if (bannerAd != null) {
            bannerAd.destroy();
            bannerAd = null;
        }
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
