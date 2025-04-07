
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
              // Add this line to remove the open class from the toggle icon
              this.querySelector('.giftlist-card__toggle-icon').classList.remove('open');
          } else {
              // 開く
              giftItem.classList.add('active');
              hiddenContent.style.height = hiddenInner.offsetHeight + 'px';
              // Add this line to add the open class to the toggle icon
              this.querySelector('.giftlist-card__toggle-icon').classList.add('open');
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



class Accordion {
    constructor(elm, question, answer) {
      this.DOM = {};
      this.DOM.elm = elm;
      this.question = this.DOM.elm.querySelector(question);
      this.answer = this.DOM.elm.querySelector(answer);
      this.isAnimating = false;
      this.toggleIcon = this.DOM.elm.querySelector(".point-qa__toggle-icon");
      this.animTiming = {
        duration: 300,
        easing: "ease-in-out",
      };
      
      // 初期化の前に、要素を一時的に表示させて正確な高さを取得できるようにする
      this.prepareElements();
      this.init();
    }
    
    // 新しいメソッド: 要素の準備
    prepareElements() {
      const answer = this.answer;
      // 初期状態を記憶
      const originalDisplay = window.getComputedStyle(answer).display;
      const originalVisibility = window.getComputedStyle(answer).visibility;
      const originalHeight = window.getComputedStyle(answer).height;
      const originalPosition = window.getComputedStyle(answer).position;
      
      // 一時的に表示して高さを計算できるようにする（画面には見えないように）
      answer.style.display = "block";
      answer.style.visibility = "hidden";
      answer.style.position = "absolute";
      
      // 高さを取得して内部に記憶
      this.fullHeight = answer.scrollHeight;
      
      // 元の状態に戻す
      answer.style.display = originalDisplay;
      answer.style.visibility = originalVisibility;
      answer.style.height = originalHeight;
      answer.style.position = originalPosition;
    }
  
    init() {
      const details = this.DOM.elm;
      const answer = this.answer;
      
      // 初期状態の設定
      if (!details.hasAttribute("open")) {
        answer.style.height = "0px";
        answer.style.opacity = "0";
        answer.style.overflow = "hidden";
      } else {
        // 開いている状態ではすでに計算した高さを使用
        answer.style.height = "auto";
        answer.style.opacity = "1";
        answer.style.overflow = "visible";
        
        if (this.toggleIcon) {
          this.toggleIcon.classList.add("open");
        }
      }
  
      this.question.addEventListener("click", (e) => {
        // アニメーション中は操作を無視
        if (this.isAnimating) {
          e.preventDefault();
          return;
        }
  
        // デフォルトの動作を防止
        e.preventDefault();
  
        const details = this.DOM.elm;
        const answer = this.answer;
  
        // 現在の状態を取得
        const isOpen = details.hasAttribute("open");
  
        if (!isOpen) {
          // 開く処理
          // まず属性を設定
          details.setAttribute("open", "");
          
          // トグルアイコンの状態を更新
          if (this.toggleIcon) {
            this.toggleIcon.classList.add("open");
          }
          
          // 表示前の準備
          answer.style.display = "block";
          answer.style.height = "0px";
          answer.style.opacity = "0";
          answer.style.overflow = "hidden";
          
          // 強制的に再描画して高さ計算を確実にする
          void answer.offsetHeight;
          
          // この時点での実際の高さを取得（初回でも正確な値を得るため）
          const targetHeight = this.fullHeight || answer.scrollHeight;
          
          // アニメーション開始
          this.isAnimating = true;
          
          // Web Animations APIでアニメーション
          const animation = answer.animate(
            [
              { height: "0px", opacity: 0 },
              { height: targetHeight + "px", opacity: 1 }
            ],
            this.animTiming
          );
  
          animation.onfinish = () => {
            answer.style.height = "auto";
            answer.style.opacity = "1";
            answer.style.overflow = "visible";
            this.isAnimating = false;
            
            // 実際の高さを更新（次回のためにキャッシュ）
            this.fullHeight = answer.scrollHeight;
          };
        } else {
          // 閉じる処理
          // 現在の高さを取得（autoの場合に備えて）
          const startHeight = answer.offsetHeight;
          
          // アニメーションのために高さを固定
          answer.style.height = startHeight + "px";
          answer.style.overflow = "hidden";
  
          // アニメーション開始
          this.isAnimating = true;
          
          const animation = answer.animate(
            [
              { height: startHeight + "px", opacity: 1 },
              { height: "0px", opacity: 0 }
            ],
            this.animTiming
          );
  
          animation.onfinish = () => {
            // アニメーション完了後に属性を削除
            details.removeAttribute("open");
            answer.style.height = "0px";
            answer.style.opacity = "0";
            
            // トグルアイコンの状態を更新
            if (this.toggleIcon) {
              this.toggleIcon.classList.remove("open");
            }
            
            this.isAnimating = false;
          };
        }
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const createToggleIcon = () => {
      const toggleIcons = document.querySelectorAll(".point-qa__toggle-icon");
      toggleIcons.forEach((icon) => {
        // 既存のコンテンツをクリア
        icon.innerHTML = "";
        
        // プラスアイコンを作成
        const plusIcon = document.createElement("span");
        plusIcon.classList.add("point-qa__plus-icon");
        icon.appendChild(plusIcon);
        
        // 親要素がopen属性を持っている場合はopenクラスを追加
        const item = icon.closest('.point-qa__item');
        if (item && item.hasAttribute('open')) {
          icon.classList.add('open');
        }
      });
    };
  
    const initAccordions = () => {
      document.querySelectorAll(".point-qa__item").forEach((elm) => {
        new Accordion(elm, ".point-qa__question", ".point-qa__answer-container");
      });
    };
  
    // ウィンドウリサイズ時の処理
    window.addEventListener("resize", () => {
      document.querySelectorAll(".point-qa__item[open] .point-qa__answer-container").forEach((answer) => {
        // 開いている要素の高さを自動に設定
        answer.style.height = "auto";
        
        // Accordionインスタンスにアクセスできる場合、高さを更新
        const item = answer.closest('.point-qa__item');
        if (item && item._accordion) {
          item._accordion.fullHeight = answer.scrollHeight;
        }
      });
    });
  
    createToggleIcon();
    initAccordions();
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