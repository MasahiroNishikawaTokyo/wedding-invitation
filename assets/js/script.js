/* ============================================================
   Wedding Invitation — script.js
   Vanilla JavaScript のみ。サーバー処理・外部保存は一切行いません。
   ============================================================ */

/**
 * ここを書き換えるだけで出欠フォームのリンク先を変更できます。
 * Googleフォームを作成したら、そのURL（例: https://forms.gle/XXXXXXXX）を
 * 下記 rsvpFormUrl に貼り付けてください。
 *
 * 出欠情報はこのサイト内には一切保存されません。
 * 「出欠を回答する」ボタンは、押すとGoogleフォーム（または
 * Google Apps Script経由の送信先）へ移動するだけの仕組みです。
 */
const weddingConfig = {
  rsvpFormUrl: rsvpFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfI86v6FuJO8u7eBhTJYQKzgO0SKkTxNVYxMZPU3IbljD9N3A/viewform", // ← ここをご自身のGoogleフォームURLに書き換えてください
};

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    setupRsvpButton();
    setupScrollFadeIn();
    setupDotNav();
  });

  /**
   * RSVPボタンの遷移先を weddingConfig.rsvpFormUrl に設定する。
   * URLが初期値（プレースホルダー）のままの場合は、公開前に
   * 気付けるよう注意書きを表示する。
   */
  function setupRsvpButton() {
    const button = document.getElementById("rsvp-button");
    const fallback = document.getElementById("rsvp-fallback");
    if (!button) return;

    const url = (weddingConfig.rsvpFormUrl || "").trim();
    const isPlaceholder = !url || url.indexOf("XXXXXXXX") !== -1;

    if (isPlaceholder) {
      // URL未設定時は誤って空リンクや仮URLに飛ばないようにする
      button.setAttribute("href", "#rsvp");
      button.setAttribute("aria-disabled", "true");
      button.addEventListener("click", function (e) {
        e.preventDefault();
      });
      if (fallback) fallback.hidden = false;
      return;
    }

    button.setAttribute("href", url);
  }

  /**
   * 各セクションが画面に入ったタイミングでふわっと表示するアニメーション。
   * サーバー通信は発生しない、純粋な表示演出のみ。
   */
  function setupScrollFadeIn() {
    const sections = document.querySelectorAll(".section");
    if (!("IntersectionObserver" in window) || sections.length === 0) {
      sections.forEach(function (s) {
        s.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /**
   * 右側のドットナビゲーションで、現在表示中のセクションをハイライトする。
   */
  function setupDotNav() {
    const links = document.querySelectorAll(".dot-link");
    const sections = document.querySelectorAll(".section[id]");
    if (links.length === 0 || sections.length === 0) return;

    const linkMap = {};
    links.forEach(function (link) {
      const id = link.getAttribute("href").replace("#", "");
      linkMap[id] = link;
    });

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const id = entry.target.getAttribute("id");
          const link = linkMap[id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) {
              l.classList.remove("active");
            });
            link.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
