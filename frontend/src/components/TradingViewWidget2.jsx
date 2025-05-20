import React, { useEffect, useRef } from 'react';

const TradingViewWidget2 = () => {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    const updateWidgetSize = () => {
      const widgetContainer = widgetContainerRef.current;
      if (!widgetContainer) return;

      const widgetWidth = widgetContainer.offsetWidth;
      const widgetId = 'technical-analysis';

      new window.TradingView.widget({
        container_id: widgetId,
        width: widgetWidth,
        height: 550,
        symbol: 'BTC',
        interval: 'D',
        timezone: 'exchange',
        theme: 'Light',
        style: '1',
        toolbar_bg: '#f1f3f6',
        withdateranges: true,
        hide_side_toolbar: true,
        allow_symbol_change: true,
        save_image: false,
        studies: ['MASimple@tv-basicstudies'],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '60',
        locale: 'en',
      });
    };

    const handleResize = () => {
      updateWidgetSize();
    };

    window.addEventListener('resize', handleResize);

    // Load TradingView script and initialize widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = updateWidgetSize;

    document.head.appendChild(script);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={widgetContainerRef}>
      <div id="technical-analysis">
        <div
          id="tradingview_2726a-wrapper"
          style={{
            position: 'relative',
            boxSizing: 'content-box',
            width: '600px',
            height: '200px',
            margin: '0 auto !important',
            padding: '0 !important',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
          }}
        >
          <div
            style={{
              width: '600px',
              height: '200px',
              background: 'transparent',
              padding: '0 !important',
            }}
          >
            <iframe
              id="tradingview_2726a"
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_2726a&amp;symbol=AAPL&amp;interval=D&amp;hidesidetoolbar=0&amp;symboledit=1&amp;saveimage=0&amp;toolbarbg=f1f3f6&amp;studies=ROC%40tv-basicstudies%1FStochasticRSI%40tv-basicstudies%1FMASimple%40tv-basicstudies&amp;theme=Dark&amp;style=1&amp;timezone=exchange&amp;withdateranges=1&amp;showpopupbutton=1&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;showpopupbutton=1&amp;locale=en&amp;utm_source=upwaveoptions.com&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=AAPL#%7B%22page-uri%22%3A%22upwaveoptions.com%2Fuser%2Findex.php%22%7D"
              style={{ width: '100%', height: '100px', margin: '0 !important', padding: '0 !important' }}

              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget2;
