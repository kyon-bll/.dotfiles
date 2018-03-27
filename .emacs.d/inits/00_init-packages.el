;; パッケージ読み込み
(package-initialize)
(add-to-list 'package-archives '("marmalade" . "https://marmalade-repo.org/packages/"))
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("org" . "http://orgmode.org/elpa/") t) ; Org-mo
;; package-check-signature を allow-unsigned に 署名なしパッケージを許可する
(setq package-check-signature 'allow-unsigned)

;; パッケージ初期化
;; (package-refresh-contents)

;; パッケージ指定
(package-install 'migemo)
(package-install 'google-translate)
(package-install 'auto-complete)
(package-install 'mwim)
(package-install 'goto-chg)
(package-install 'browse-kill-ring)
(package-install 'counsel)
(package-install 'recentf-ext)
(package-install 'hlinum)
(package-install 'web-mode)
(package-install 'emmet-mode)
(package-install 'flex-autopair)
(package-install 'flycheck)
(package-install 'python-mode)
(package-install 'fish-mode)
