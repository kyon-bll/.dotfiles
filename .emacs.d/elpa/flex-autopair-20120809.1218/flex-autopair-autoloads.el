;;; flex-autopair-autoloads.el --- automatically extracted autoloads
;;
;;; Code:

(add-to-list 'load-path (directory-file-name
                         (or (file-name-directory #$) (car load-path))))


;;;### (autoloads nil "flex-autopair" "flex-autopair.el" (0 0 0 0))
;;; Generated autoloads from flex-autopair.el

(autoload 'flex-autopair-mode "flex-autopair" "\
Toggle automatic parens pairing (Flex Autopair mode).
With a prefix argument ARG, enable Flex Autopair mode if ARG is
positive, and disable it otherwise.  If called from Lisp, enable
the mode if ARG is omitted or nil.

Flex Autopair mode is a minor mode.  When enabled, typing
an open parenthesis automatically inserts the corresponding
closing parenthesis.  (Likewise for brackets, etc.)

\(fn &optional ARG)" t nil)

(put 'global-flex-autopair-mode 'globalized-minor-mode t)

(defvar global-flex-autopair-mode nil "\
Non-nil if Global Flex-Autopair mode is enabled.
See the `global-flex-autopair-mode' command
for a description of this minor mode.
Setting this variable directly does not take effect;
either customize it (see the info node `Easy Customization')
or call the function `global-flex-autopair-mode'.")

(custom-autoload 'global-flex-autopair-mode "flex-autopair" nil)

(autoload 'global-flex-autopair-mode "flex-autopair" "\
Toggle Flex-Autopair mode in all buffers.
With prefix ARG, enable Global Flex-Autopair mode if ARG is positive;
otherwise, disable it.  If called from Lisp, enable the mode if
ARG is omitted or nil.

Flex-Autopair mode is enabled in all buffers where
`flex-autopair-mode-maybe' would do it.
See `flex-autopair-mode' for more information on Flex-Autopair mode.

\(fn &optional ARG)" t nil)

(if (fboundp 'register-definition-prefixes) (register-definition-prefixes "flex-autopair" '("flex-autopair")))

;;;***

;; Local Variables:
;; version-control: never
;; no-byte-compile: t
;; no-update-autoloads: t
;; coding: utf-8
;; End:
;;; flex-autopair-autoloads.el ends here
