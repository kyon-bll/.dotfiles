;; ========================== ;;
;;        auto install        ;;
;; ========================== ;;

;; 以下参考に auto-install をインストール
;; https://www-he.scphys.kyoto-u.ac.jp/member/shotakaha/dokuwiki/doku.php?id=toolbox:emacs:package:start


;; ========================= ;;
;;        init loader        ;;
;; ========================= ;;

(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(package-initialize)
(package-install 'init-loader)

(require 'init-loader)
(setq init-loader-show-log-after-init 'error-only)
(init-loader-load "~/.emacs.d/inits")

;; ======================== ;;
;;        自動追記分        ;;
;; ======================== ;;

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages
   '(web-mode recentf-ext pos-tip mwim migemo init-loader hlinum goto-chg google-translate flycheck flex-autopair emmet-mode counsel browse-kill-ring auto-complete))
 '(py-keep-windows-configuration 't)
 '(py-split-windows-on-execute-function 'split-window-vertically))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(linum-highlight-face ((t (:foreground "black" :background "red")))))
