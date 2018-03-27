;; M-% がなんかエラー出すことがあるから、修正
(defun query-replace-read-from--fix-error (&rest them)
  (condition-case _
      (apply them)
    (error (setq query-replace-defaults nil)
           (apply them))))
(advice-add 'query-replace-read-from :around
            'query-replace-read-from--fix-error)
