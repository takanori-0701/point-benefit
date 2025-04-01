
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
    



});

// ギフト一覧のアコーディオン
document.addEventListener('DOMContentLoaded', function() {
    // 自動的に開くコードを削除（すべてのカードを閉じた状態にする）
    
    // 開閉ボタンエリアのクリックイベント
    const toggleAreas = document.querySelectorAll('.giftlist-card__toggle-area');
    
    toggleAreas.forEach(area => {
        area.addEventListener('click', function() {
            const giftItem = this.closest('.giftlist-card__item');
            const hiddenContent = giftItem.querySelector('.giftlist-card__hidden-content');
            const hiddenInner = giftItem.querySelector('.giftlist-card__hidden-inner');
            
            // 現在のアイテムの状態を切り替え
            if (giftItem.classList.contains('active')) {
                // 閉じる
                giftItem.classList.remove('active');
                hiddenContent.style.height = '0';
            } else {
                // 開く
                giftItem.classList.add('active');
                hiddenContent.style.height = hiddenInner.offsetHeight + 'px';
            }
        });
    });
    
    // ウィンドウリサイズ時にコンテンツの高さを再計算
    window.addEventListener('resize', function() {
        const activeItems = document.querySelectorAll('.giftlist-card__item.active');
        
        activeItems.forEach(item => {
            const hiddenContent = item.querySelector('.giftlist-card__hidden-content');
            const hiddenInner = item.querySelector('.giftlist-card__hidden-inner');
            
            hiddenContent.style.height = hiddenInner.offsetHeight + 'px';
        });
    });
});


// QAのアコーディオン
class Accordion {
    /**
     * コンストラクタ
     * @param {HTMLElement} elm - アコーディオン要素
     * @param {string} summary - サマリー要素のセレクタ
     * @param {string} content - コンテンツ要素のセレクタ
     */
    constructor(elm, summary, content) {
      this.DOM = {};
      this.DOM.elm = elm;
      this.summary = this.DOM.elm.querySelector(summary);
      this.content = this.DOM.elm.querySelector(content);
      
      // アニメーションのタイミング設定
      this.animTiming = {
        duration: 300,
        easing: "ease-in-out",
      };
      
      this.init();
    }
    
    /**
     * 閉じるアニメーション
     * @param {HTMLElement} height - アニメーションの対象要素
     * @returns {Array} アニメーションのキーフレーム
     */
    closingAnimation(height) {
      return [
        {
          height: height.scrollHeight + "px",
          opacity: 1,
        },
        {
          height: 0,
          opacity: 0,
        },
      ];
    }
    
    /**
     * 開くアニメーション
     * @param {HTMLElement} height - アニメーションの対象要素
     * @returns {Array} アニメーションのキーフレーム
     */
    openingAnimation(height) {
      return [
        {
          height: 0,
          opacity: 0,
        },
        {
          height: height.scrollHeight + "px",
          opacity: 1,
        },
      ];
    }
    
    /**
     * 初期化
     */
    init() {
      // detailsのopen属性が変更された時のイベントを監視
      this.DOM.elm.addEventListener('toggle', (e) => {
        const details = e.target;
        const content = details.querySelector(this.content.tagName);
        
        if (details.open) {
          // 開く時のアニメーション
          content.animate(
            this.openingAnimation(content),
            this.animTiming
          );
        } else {
          // 閉じる時のアニメーション
          const closing = content.animate(
            this.closingAnimation(content),
            this.animTiming
          );
          
          // アニメーション完了後にdetailsを閉じる
          closing.onfinish = () => {
            details.open = false;
          };
        }
      });
      
      // サマリーがクリックされた時のイベント
      this.summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 開閉状態を切り替え
        const details = this.DOM.elm;
        details.open = !details.open;
      });
    }
  }
  
  // DOMの読み込みが完了したら実行
  document.addEventListener('DOMContentLoaded', () => {
    // すべてのQ&A項目に対してアコーディオン機能を適用
    document.querySelectorAll('.qa-item').forEach((elm) => {
      new Accordion(elm, '.qa-item__summary', '.qa-item__content');
    });
  });


// スムーズスクロール
  document.addEventListener("DOMContentLoaded", function() {
    // すべてのページ内リンクを取得
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // デフォルトの動作を無効化
            const targetId = this.getAttribute("href").substring(1); // "#target" の "#" を削除
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80px分上に調整（ヘッダー固定用）
                    behavior: "smooth" // スムーズスクロール
                });
            }
        });
    });
});