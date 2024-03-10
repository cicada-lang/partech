(define-grammar <operator>
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

(define-grammar <operator>
  [var (let name <identifier>) => (Exp::Var (match-string name))]
  [ap (let target <operator>)
      (let arg-entries-group (one-or-more "(" <arg-entries> ")"))
   => (Exp::Ap (match <exp> target)
               (match-list ...))]
  [sequence-begin (let sequence <sequence>)
   => (Exp::Sequence (match <sequence> sequence))]
  [car "car" "(" (let target <exp>) ")"
   => (Exp::Car (match <exp> target))]
  [cdr "cdr" "(" (let target <exp>) ")"
   => (Exp::Cdr (match <exp> target))]
  [dot-field (let target <operator>) "." (let name <identifier>)
   => (Exp::Dot (match <exp> target) (match <identifier> name))]
  [dot-method
   (let target <operator>) "." (let name <identifier>)
   (let arg-entries-group (one-or-more "(" <arg-entries> ")"))]
  [recursion
   "recursion" "(" (let target <exp>) ")"
   "{" (let case-entries (zero-or-more <case-entry>)) "}"]
  [induction
   "induction" "(" (let target exp) ")"
   "{" "motive" (let motive "exp")
   (let case-entries (zero-or-more <case-entry>)) "}"])

(define-grammar <operator>
  [var (let name <identifier>) => (Exp::Var name)]
  [ap (let target <operator>)
      (let arg-entries-group (one-or-more "(" <arg-entries> ")"))
   => (Exp::Ap target
               (TODO arg-entries-group))]
  [sequence-begin (let sequence <sequence>)
   => (Exp::Sequence sequence)]
  [car "car" "(" (let target <exp>) ")"
   => (Exp::Car target)]
  [cdr "cdr" "(" (let target <exp>) ")"
   => (Exp::Cdr target)]
  [dot-field (let target <operator>) "." (let name <identifier>)
   => (Exp::Dot target name)]
  [dot-method
   (let target <operator>) "." (let name <identifier>)
   (let arg-entries-group (one-or-more "(" <arg-entries> ")"))]
  [recursion
   "recursion" "(" (let target <exp>) ")"
   "{" (let case-entries (zero-or-more <case-entry>)) "}"]
  [induction
   "induction" "(" (let target exp) ")"
   "{" "motive" (let motive "exp")
   (let case-entries (zero-or-more <case-entry>)) "}"])
