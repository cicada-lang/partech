(define-grammar operator
  (var (let name identifier))
  (ap (let target operator)
      (let arg-entries-group (one-or-more "(" arg-entries ")")))
  (sequence-begin (let sequence sequence))
  (car "car" "(" (let target exp) ")")
  (cdr "cdr" "(" (let target exp) ")")
  (dot-field (let target operator) "." (let name identifier))
  (dot-method
   (let target operator) "." (let name identifier)
   (let arg-entries-group (one-or-more "(" arg-entries ")")))
  (recursion
   "recursion" "(" (let target exp) ")"
   "{" (let case-entries (zero-or-more case-entry)) "}")
  (induction
   "induction" "(" (let target exp) ")"
   "{" "motive" (let motive "exp")
   (let case-entries (zero-or-more case-entry)) "}"))
