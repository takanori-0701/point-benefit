
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
    



});
document.addEventListener('DOMContentLoaded', function() {
    // 中古レンズフィルターギフトを自動的に開く（デモ用）
    const filterGiftItem = document.querySelector('.giftlist-card__item:nth-child(1)');
    const filterHiddenContent = filterGiftItem.querySelector('.giftlist-card__hidden-content');
    const filterHiddenInner = filterGiftItem.querySelector('.giftlist-card__hidden-inner');
    
    // 高さを計算して設定
    filterHiddenContent.style.height = filterHiddenInner.offsetHeight + 'px';
    filterGiftItem.classList.add('active');
    
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