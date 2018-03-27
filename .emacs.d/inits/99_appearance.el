;; 括弧の色を強調する設定
(require 'cl-lib)
(require 'color)
(defun rainbow-delimiters-using-stronger-colors ()
  (interactive)
  (cl-loop
   for index from 1 to rainbow-delimiters-max-face-count
   do
   (let ((face (intern (format "rainbow-delimiters-depth-%d-face" index))))
     (cl-callf color-saturate-name (face-foreground face) 30))))
(add-hook 'emacs-startup-hook 'rainbow-delimiters-using-stronger-colors)
;; 対応する括弧を光らせる
(show-paren-mode 1)

;; ウインドウ分割時に画面外へ出る文章を折り返す
(setq truncate-partial-width-windows nil)

;; メニューバーを消す
(menu-bar-mode -1)

;; ツールバーを消す
(tool-bar-mode -1)

;; 列数を表示する
(column-number-mode t)

;; 行番号表示
(global-linum-mode t)
;; 5行分スペース確保
(setq linum-format "%5d")

;; カーソル行番号をハイライトする
(require 'hlinum)
(hlinum-activate)
(custom-set-faces
 '(linum-highlight-face ((t (:foreground "black" :background "red")))))

;; 時間表示
(display-time)
