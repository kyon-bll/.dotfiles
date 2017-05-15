;; パッケージ読み込み
(package-initialize)
(require 'package)
(add-to-list 'package-archives '("marmalade" . "https://marmalade-repo.org/packages/"))
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("org" . "http://orgmode.org/elpa/") t) ; Org-mo

;; 環境を日本語、UTF-8にする
(set-locale-environment nil)
(set-language-environment "Japanese")
(set-terminal-coding-system 'utf-8)
(set-keyboard-coding-system 'utf-8)
(set-buffer-file-coding-system 'utf-8)
(setq default-buffer-file-coding-system 'utf-8)
(set-default-coding-systems 'utf-8)
(prefer-coding-system 'utf-8)

;; mozc
(require 'mozc)
(set-language-environment "Japanese")
(setq default-input-method "japanese-mozc")

;;; 右から左に読む言語に対応させないことで描画高速化
(setq-default bidi-display-reordering nil)

;; C-u C-SPC C-SPC …でどんどん過去のマークを遡る
(setq set-mark-command-repeat-pop t)

;;; ファイルを開いた位置を保存する
(require 'saveplace)
(setq-default save-place t)
(setq save-place-file (concat user-emacs-directory "places"))

;;; ミニバッファ履歴を次回Emacs起動時にも保存する
(savehist-mode 1)

;;; ログの記録行数を増やす
(setq message-log-max 10000)

;;; 履歴をたくさん保存する
(setq history-length 1000)

;; make what-whereでSKK modulesで表示されるディレクトリを指定
(add-to-list 'load-path "/usr/local/share/emacs/24.3/site-lisp/skk")
;; M-x skk-tutorialでNo file found as 〜とエラーが出たときにskk-tut-fileを設定
;; make what-whereでSKK tutorialsで表示されるディレクトリ上のSKK.tutを指定
(setq skk-tut-file "/usr/share/skk/SKK.tut")
(require 'skk)
(require 'dired-x)
(global-set-key "\C-x\C-j" 'skk-mode)

;; アルファベットで日本語検索
(when (locate-library "migemo")
  (setq migemo-command "/usr/bin/cmigemo") ; HERE cmigemoバイナリ
  (setq migemo-options '("-q" "--emacs"))
  (setq migemo-dictionary
        "/usr/share/cmigemo/utf-8/migemo-dict") ; HERE Migemo辞書
  (setq migemo-user-dictionary nil)
  (setq migemo-regex-dictionary nil)
  (setq migemo-coding-system 'utf-8-unix)
  (load-library "migemo")
  (migemo-init))

;; 画面内検索

(require 'ace-jump-mode)
(setq ace-jump-mode-gray-background nil)
(setq ace-jump-word-mode-use-query-char nil)
(setq ace-jump-mode-move-keys
      (append "asdfghjkl;:]qwertyuiop@zxcvbnm,." nil))
(global-set-key (kbd "C-o") 'ace-jump-word-mode)

;; 2画面ファイラー
(setq dired-dwim-target t)

;; wdired
(require 'wdired)
(setq wdired-allow-to-change-permissions t)
(define-key dired-mode-map "e" 'wdired-change-to-wdired-mode)

;; ido ファイル検索簡略化
(ido-mode 1)
(ido-everywhere 1)

;; bs バッファ
(global-set-key (kbd "C-x C-b") 'bs-show)

;; フォント
(set-face-attribute 'default nil :family "Ricty for Powerline")

;; fish-mode
(require 'fish-mode)
(add-to-list 'auto-mode-alist '("\\.fish\\'" . fish-mode))

;; powerline
(require 'powerline)
(powerline-default-theme)

;; (set-face-attribute 'mode-line nil
;;                     :foreground "#fff"
;;                     :background "#FF0066"
;;                     :box nil)

;; (set-face-attribute 'powerline-active1 nil
;;                     :foreground "#fff"
;;                     :background "#FF6699"
;;                     :inherit 'mode-line)

;; (set-face-attribute 'powerline-active2 nil
;;                     :foreground "#000"
;;                     :background "#ffaeb9"
;;                     :inherit 'mode-line)

;; スタートアップメッセージを表示させない
(setq inhibit-startup-message t)

;; バックアップファイルを作成させない
;(setq make-backup-files nil)

;; 終了時にオートセーブファイルを削除する
;(setq delete-auto-save-files t)

;; 自動保存ファイルのリストファイル作成しない
(setq auto-save-list-file-prefix nil)

;; バッファ読み込み
(global-set-key [f5] 'eval-buffer)

;; カーソル位置から行頭まで削除する
(defun backward-kill-line (arg)
  "Kill chars backward until encountering the end of a line."
  (interactive "p")
  (kill-line 0))
;; C-M-kに設定
(global-set-key (kbd "C-M-k") 'backward-kill-line)

;; テーマ
(load-theme 'spacemacs-dark t)
;; (add-to-list 'custom-theme-load-path "~/.emacs.d/themes")
;; (load-theme 'dracula t)

;; (custom-set-faces
;;  '(default ((t
;;              (:background "black" :foreground "#55FF55")
;;              ))))

;; 括弧を虹色表示
(require 'rainbow-delimiters)
(add-hook 'prog-mode-hook 'rainbow-delimiters-mode)
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

;; フレーム位置設定
(setq initial-frame-alist
      (append
       '((top . 0)    ; フレームの Y 位置 (ピクセル数)
         (left . 200)    ; フレームの X 位置 (ピクセル数)
         (width . 61)    ; フレーム幅 (文字数)
         (height . 53)   ; フレーム高 (文字数)
         ) initial-frame-alist))

;; タブにスペースを使用する
(setq-default tab-width 4 indent-tabs-mode nil)

;; ページスクロールの際に５行かぶらせる
(setq next-screen-context-lines 5)

;; ページスクロールの際にカーソル位置保持
(setq scroll-preserve-screen-position t)

;; スクロールマージン
(setq scroll-margin 10)

;; 反対側のウィンドウにいけるように
(setq windmove-wrap-around t)

;; バッファ読み込み
(global-set-key
 [f5] 'eval-buffer)

;; C-M-kで行頭からカーソル位置まで削除
(defun backward-kill-line (arg)
  "Kill chars backward until encountering the end of a line."
  (interactive "p")
  (kill-line 0))
;; C-M-kに設定
(global-set-key (kbd "C-M-k") 'backward-kill-line)

;; C-M-{h,m,l}でウィンドウ内移動
;(global-set-key (kbd "C-M-h") (lambda () (interactive) (move-to-window-line 0)))
;(global-set-key (kbd "C-M-m") (lambda () (interactive) (move-to-window-line nil)))
;(global-set-key (kbd "C-M-l") (lambda () (interactive) (move-to-window-line -1)))

;; カーソルキーでウィンドウ間を移動
(define-key global-map (kbd "<up>") 'windmove-up)
(define-key global-map (kbd "<down>") 'windmove-down)
(define-key global-map (kbd "<right>") 'windmove-right)
(define-key global-map (kbd "<left>") 'windmove-left)

;; 改行コードを表示する
(setq eol-mnemonic-dos "(CRLF)")
(setq eol-mnemonic-mac "(CR)")
(setq eol-mnemonic-unix "(LF)")

;; 複数ウィンドウを禁止する
(setq ns-pop-up-frames nil)

;; ウィンドウを透明にする
;; アクティブウィンドウ／非アクティブウィンドウ（alphaの値で透明度を指定）
(add-to-list 'default-frame-alist '(alpha . (0.85 0.85)))

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
;; 前景色を黒，背景色を赤にする．
(custom-set-faces '(linum-highlight-face ((t (:foreground "black" :background "red")))))

;; カーソルの点滅をやめる
(blink-cursor-mode 0)

;; 対応する括弧を光らせる
(show-paren-mode 1)

;; ウィンドウ内に収まらないときだけ、カッコ内も光らせる
(setq show-paren-style 'mixed)
(set-face-background 'show-paren-match-face "grey")
(set-face-foreground 'show-paren-match-face "black")

;; スペース、タブなどを可視化する

;; スクロールは１行ごとに
(setq scroll-conservatively 1)

;; 行頭C-kで改行文字も削除する
(setq kill-whole-line t)

;; dired設定
(require 'dired-x)
;; diredを2つのウィンドウで開いている時に、デフォルトの移動orコピー先をもう一方のdiredで開いているディレクトリにする
(setq dired-dwim-target t)
;; ディレクトリを再帰的にコピーする
(setq dired-recursive-copies 'always)
;; diredバッファでC-sした時にファイル名だけにマッチするように
(setq dired-isearch-filenames t)
;; "yes or no" の選択を "y or n" にする
(fset 'yes-or-no-p 'y-or-n-p)

;; 時間表示
(display-time)

;; デフォルトブラウザ
(setq browse-url-browser-function 'browse-url-generic)
(setq browse-url-generic-program
      (if (file-exists-p "/usr/bin/google-chrome")
          "/usr/bin/google-chrome"))
;; おまけで yahtml も同じのに設定しちゃうのもアリかも。
(setq yahtml-www-browser browse-url-generic-program)

;; beep音を消す
(defun my-bell-function ()
  (unless (memq this-command
		'(isearch-abort abort-recursive-edit exit-minibuffer
				keyboard-quit mwheel-scroll down up next-line previous-line
				backward-char forward-char))
    (ding)))
(setq ring-bell-function 'my-bell-function)
(require 'package)
(add-to-list 'package-archives
             '("melpa" . "https://melpa.org/packages/"))
(when (< emacs-major-version 24)
  (add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))
(package-initialize)

;; auto-complete
(require 'auto-complete-config)
(ac-config-default)
(add-to-list 'ac-modes 'text-mode)         ;; text-modeでも自動的に有効にする
(add-to-list 'ac-modes 'fundamental-mode)  ;; fundamental-mode
(add-to-list 'ac-modes 'org-mode)
(add-to-list 'ac-modes 'yatex-mode)
(ac-set-trigger-key "TAB")
(setq ac-use-menu-map t)       ;; 補完メニュー表示時にC-n/C-pで補完候補選択
(setq ac-use-fuzzy t)          ;; 曖昧マッチ

(global-auto-complete-mode 1)
(setq-default ac-sources '(ac-source-yasnippet
                           ac-source-abbrev
                           ac-source-dictionary
                           ac-source-words-in-all-buffer))

;; 閉じカッコ自動挿入
(require 'flex-autopair)
(flex-autopair-mode 1)
;; %, 'も自動挿入
(defun web-hook-function ()
  (add-to-list 'flex-autopair-pairs '(?\% . ?\%))
  (add-to-list 'flex-autopair-pairs '(?\' . ?\'))
  (add-to-list 'flex-autopair-pairs '(?\< . ?\>)))
(add-hook 'web-mode-hook 'web-hook-function)
(defun python-hook-function ()
  (add-to-list 'flex-autopair-pairs '(?\' . ?\')))
(add-hook 'web-mode-hook 'python-hook-function)

;; web-mode: HTML template
(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.phtml\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.tpl\\.php\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.[gj]sp\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.as[cp]x\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.erb\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.mustache\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.djhtml\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))
(setq web-mode-engines-alist
      '(
        ("php"    . "\\.phtml\\'")
        ("blade"  . "\\.blade\\.")
        ("django" . "\\.html\\'")
        ))
(setq web-mode-auto-close-style 1)
(setq web-mode-tag-auto-close-style t)
;; (setq web-mode-enable-auto-pairing t) ^の閉じカッコ自動挿入とかぶる

;; ;; 色の設定 黄色くてつよい
;; (custom-set-faces
;;  '(web-mode-doctype-face          ((t (:foreground "#82AE46"))))
;;  '(web-mode-html-tag-face         ((t (:foreground "#E6B422" :weight bold))))
;;  '(web-mode-html-attr-name-face   ((t (:foreground "#C97586"))))
;;  '(web-mode-html-attr-value-face  ((t (:foreground "#82AE46"))))
;;  '(web-mode-comment-face          ((t (:foreground "#D9333F"))))
;;  '(web-mode-server-comment-face   ((t (:foreground "#D9333F"))))
;;  '(web-mode-css-rule-face         ((t (:foreground "#A0D8EF"))))
;;  '(web-mode-css-pseudo-class-face ((t (:foreground "#FF7F00"))))
;;  '(web-mode-css-at-rule-face      ((t (:foreground "#FF7F00"))))
;;  )

;; 色 青い
(custom-set-faces
 '(web-mode-doctype-face           ((t (:foreground "#4A8ACA"))))
 '(web-mode-html-tag-face          ((t (:foreground "#4A8ACA" :weight bold))))
 '(web-mode-html-attr-name-face    ((t (:foreground "#87CEEB"))))
 '(web-mode-html-attr-equal-face   ((t (:foreground "#FFFFFF"))))
 '(web-mode-html-attr-value-face   ((t (:foreground "#D78181"))))
 '(web-mode-comment-face           ((t (:foreground "#587F35"))))
 '(web-mode-server-comment-face    ((t (:foreground "#587F35"))))

 '(web-mode-css-at-rule-face       ((t (:foreground "#DFCF44"))))
 '(web-mode-comment-face           ((t (:foreground "#587F35"))))
 '(web-mode-css-selector-face      ((t (:foreground "#DFCF44"))))
 '(web-mode-css-pseudo-class       ((t (:foreground "#DFCF44"))))
 '(web-mode-css-property-name-face ((t (:foreground "#87CEEB"))))
 '(web-mode-css-string-face        ((t (:foreground "#D78181"))))
  )

;;-----------python-----------

;;autopep：保存時に勝手にコードを綺麗にしてくれる
;(require 'py-autopep8)
;(setq py-autopep8-options '("--max-line-length=200"))
;(setq flycheck-flake8--line-length 200)
;(add-hook 'python-mode-hook 'py-autopep8-enable-on-save)

;;pyflakes：文法がただしいかを動的チェック
(add-hook 'python-mode-hook 'flymake-python-pyflakes-load)

;;{M-n:次のエラーへ, M-p:前のエラーへ}
(global-set-key "\M-n" 'flymake-goto-next-error)
(global-set-key "\M-p" 'flymake-goto-prev-error)

;===============
; jedi (package.elの設定より下に書く)
;===============
(require 'epc)
(require 'auto-complete-config)
(require 'python)

;;;;; PYTHONPATH上のソースコードがauto-completeの補完対象になる ;;;;;
(setenv "PYTHONPATH" "/usr/local/lib/python2.7/site-packages")
(require 'jedi)
(add-hook 'python-mode-hook 'jedi:setup)
(setq jedi:complete-on-dot t)


(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(desktop-save-mode t))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

;; ==================================
;;          twittering-mode
;; ==================================

(require 'twittering-mode)

;; アカウント認証
(setq twittering-account-authorization 'authorized)
(setq twittering-oauth-access-token-alist
      '(("oauth_token" . "397319246-F8ASdkxqA5jnPXluoAv0k5egJ8Big8CAEAHcTB7j")
        ("oauth_token_secret" . "WdzSK0j8bsizlheHSQry43Lmr8dNrZsJHrbB6VeYCI6Ar")
        ("user_id" . "397319246")
        ("screen_name" . "kyon_bll")))

;; アイコン表示
(setq twittering-icon-mode t)

;; mode-line に API の残数を表示する
(setq twittering-display-remaining t)

;; タイムラインを自動更新
(setq twittering-timer-interval 90)

;; アイコン保存
(setq twittering-icon-storage-limit t)
(setq twittering-convert-fix-size 30)

;; Fでふぁぼ
(defun twittering-mode-hook-func ()
  (define-key twittering-mode-map (kbd "F") 'twittering-favorite)
  (define-key twittering-mode-map (kbd "R") 'twittering-favorite))
(add-hook 'twittering-mode-hook 'twittering-mode-hook-func)

;; タイムラインフォーマット
(setq twittering-status-format
      (concat
       ;; ヘッダ (ユーザー情報)
       "%RT{%FACE[bold]{RT} by %S\n}%i%S%p @%s%r\n"
       ;; ついーと
       "%FOLD[  ]{%T%QT{\n+------\n%FOLD[|]{%i%S%p @%s%r\n%FOLD[  ]{%T\n%C{%Y/%m/%d %H:%M:%S} from %f%FACE[font-lock-warning-face]{%FIELD-IF-NONZERO[♥ %d]{favorite_count}}%FACE[font-lock-warning-face]{%FIELD-IF-NONZERO[↺ %d]{retweet_count}}}}\n+------}}\n"
       ;; フッタ (日付、ふぁぼりつ、そーす)
       "%C{%Y/%m/%d %H:%M:%S} "
       "from %f"
       "%FACE[font-lock-warning-face]{%FIELD-IF-NONZERO[♥%d]{favorite_count}}"
       "%FACE[font-lock-warning-face]{%FIELD-IF-NONZERO[↺%d]{retweet_count}}"
       "\n--------------------------------------------------------"
       ))
