import { parse } from "acorn";
import { find } from "lodash";

// Strip semicolon (;) at the end
const unsemicolon = (s: string) => s.replace(/;\s*$/, "");

/**
 * Take source code and returns:
 * 1. Code before the last top-level expression.
 * 2. Code with the last top-level expression wrappen in a return statement
 *    (kind of an implicit return).
 *
 * Example:
 * var a = 1; React.createElement('i', null, a); // =>
 * 1. var a = 1
 * 2. var a = 1; return (React.createElement('i', null, a));
 *
 * @param {string} code
 * @returns {object}
 */
export default function splitExampleCode(code: string) {
  let ast;
  try {
    ast = parse(code);
  } catch (err) {
    return { head: "", example: code };
  }

  // @ts-ignore
  const firstExpression = find(ast.body.reverse(), {
    type: "ExpressionStatement",
  });
  if (!firstExpression) {
    return { head: "", example: code };
  }

  const { start, end } = firstExpression as any;
  const head = unsemicolon(code.substring(0, start));
  const firstExpressionCode = unsemicolon(code.substring(start, end));
  const example = `${head};\nreturn (${firstExpressionCode});`;

  return {
    head,
    example,
  };
}
