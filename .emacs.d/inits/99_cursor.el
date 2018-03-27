;; C-a, C-e コードの先頭から行頭 mwim
(global-set-key (kbd "C-a") 'mwim-beginning-of-code-or-line)
(global-set-key (kbd "C-e") 'mwim-end-of-code-or-line)

;; f7, S-f7 カーソルを戻す
(global-set-key [f7] 'point-undo)
(global-set-key [S-f7] 'point-redo)

;; f8, S-f8 変更履歴を戻る
(require 'goto-chg)
(global-set-key [f8] 'goto-last-change)
(global-set-key [S-f8] 'goto-last-change-reverse)

;; キャメルケースで単語区切り
(global-subword-mode 1)

;; ページスクロールの際に５行かぶらせる
(setq next-screen-context-lines 5)

;; ページスクロールの際にカーソル位置保持
(setq scroll-preserve-screen-position t)

;; スクロールマージン
(setq scroll-margin 6)

;; スクロールは１行ごとに
(setq scroll-conservatively 1)
