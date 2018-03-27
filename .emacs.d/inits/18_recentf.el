;; 最近使ったファイルを開く C-x f
;; 最近のファイルを無限個保存する
(setq recentf-max-saved-items nil)
;; 最近使ったファイルに加えないファイルを正規表現で指定する
(setq recentf-exclude
      '("/TAGS$" "/var/tmp/"))
(require 'recentf-ext)
(global-set-key (kbd "C-x f") 'recentf-open-files)
