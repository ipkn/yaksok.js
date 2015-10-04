import YaksokLexer from 'lexer';
import yaksokParser from 'parser';
import JsCompiler from 'compiler/js';


// 당장 목표: code2 돌리기 ...된다!
const code1 = `변수: '문자열'
만약 1 = 1 이면
    변수 보여주기`;
const code2 = `
목록: [3, 1, 4, 1, 5, 9]
목록 보여주기
목록_길이: 6  # TODO: 목록 길이
반복 1~목록_길이-1 의 위치1 마다
    반복 위치1+1~목록_길이 의 위치2 마다
        만약 목록[위치2] < 목록[위치1] 이면
            임시: 목록[위치1]
            목록[위치1]: 목록[위치2]
            목록[위치2]: 임시
목록 보여주기
`;
const code3 = `
만약 참 이면
    1
아니라면
    2
만약 참 이면
    3
`;
const code4 = `
만약 참 이면
    1
만약 참 이면
    2
`;
const code5 = `
만약 참 이면
    1

아니라면
    2

만약 참 이면
    만약 참 이면
        3
        만약 참 이면
            4
        아니라면
            5
    아니면서 만약 참 이면
        6
    아니라면 만약 참 이면
        7
아니면서 만약 참 이면
    8
아니면서 만약 참 이면
    9
아니라면
    10
`;

function test_lexer(code) {
    let lexer = new YaksokLexer();
    lexer.setInput(code);
    let token = lexer.lex();
    while (token) {
        console.log(token);
        token = lexer.lex();
    }
    console.log();
}

function test_parser(code) {
    console.dir(yaksokParser.parse(code), { depth: null, colors: true });
    console.log();
}

async function test_compiler(code) {
    let compiler = new JsCompiler();
    console.log(await compiler.compile(code));
    console.log();
}

let code = code5;
console.log(code + '\n');
test_lexer(code);
// test_parser(code);
test_compiler(code).catch(e => console.error(e.stack));
