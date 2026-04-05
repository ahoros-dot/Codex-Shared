# 新規プロジェクト作成マニュアル

このマニュアルは、今回のスレッドで実際に進めた手順をもとに作っています。

目的は 3 つです。

1. 新しいプロジェクトを迷わず始められること
2. Codex デスクトップアプリと CLI の両方で安全に使えること
3. あとから Python を追加しやすい形で育てられること

できるだけやさしく書いているので、中学生でも順番どおりに進めれば大丈夫です。

## 0. 最初に知っておくこと

今回のやり方では、最初は `Node.js + TypeScript` で始めます。

理由は次のとおりです。

- Web アプリを作りやすい
- Codex に依頼しやすい
- あとから Python を足しやすい

すぐに Python を入れないのは、最初から 2 つの言語を混ぜると管理がむずかしくなるからです。

まずは Node.js で土台を作り、必要になったら Python を `services/` に追加します。

## 1. 事前に準備しておくもの

このマニュアルでは、次のものがすでに入っている前提です。

- Git
- GitHub アカウント
- Node.js
- Codex デスクトップアプリ

あれば便利なもの:

- GitHub CLI (`gh`)

ただし、`gh` がなくても GitHub の Web サイトから repo は作れます。

## 2. 1 回だけやればよい設定

これは新しいプロジェクトごとではなく、最初に 1 回やれば十分な設定です。

### Git の名前とメールを設定する

```powershell
git config --global user.name "あなたの名前"
git config --global user.email "you@example.com"
```

### デフォルトブランチを `main` にする

```powershell
git config --global init.defaultBranch main
```

### GitHub にログインする

`gh` がある場合:

```powershell
gh auth login
```

ない場合は、GitHub のサイトに普通にログインできれば大丈夫です。

## 3. 新しいプロジェクト用フォルダを作る

まず、プロジェクトを入れるフォルダを作ります。

```powershell
mkdir C:\Users\ahoro\Desktop\MyProject
cd C:\Users\ahoro\Desktop\MyProject
```

このフォルダが、プロジェクトの家になります。

## 4. Codex デスクトップアプリでそのフォルダを開く

Codex デスクトップアプリで、今作ったフォルダを開きます。

これで、Codex と一緒にそのフォルダの中を見たり、編集したりできます。

ポイント:

- デスクトップアプリでも CLI でも同じフォルダを使ってよい
- ただし、同時に大きく編集しすぎない方が安全
- 切り替える前にコミットしておくと安心

## 5. Git 管理を始める

プロジェクトフォルダの中で次を実行します。

```powershell
git init
git branch -m main
```

意味:

- `git init`: このフォルダを Git で管理できるようにする
- `git branch -m main`: 作業の中心ブランチ名を `main` にする

## 6. 最初に作る基本ファイル

まずは次の 3 つを作ります。

- `README.md`
- `.gitignore`
- `.env.example`

### それぞれの役割

`README.md`

- このプロジェクトは何か
- どうやって起動するか
- 何の技術を使うか

を書いておく説明書です。

`.gitignore`

- Git に入れたくないファイルを指定します
- 例: `node_modules`、`dist`、`.env`

`.env.example`

- 環境変数の見本です
- 本物の秘密は書きません

## 7. Node.js 先行で育てやすいフォルダ構成にする

今回のおすすめ構成は次のとおりです。

```text
project/
  README.md
  .gitignore
  docs/
  scripts/
  contracts/
  apps/
    web/
      package.json
      tsconfig.json
      .env.example
      src/
  services/
```

この形にする理由:

- `apps/web` に Node.js アプリをまとめられる
- `services/` をあとで Python 用に使える
- ルートがごちゃごちゃしにくい

## 8. Node.js + TypeScript の最小構成を作る

`apps/web` の中に Node.js アプリを作ります。

最低限あるとよいもの:

- `package.json`
- `tsconfig.json`
- `src/index.ts`
- `src/server.ts`
- `src/server.test.ts`

### このときの考え方

- `index.ts`: 起動の入口
- `server.ts`: サーバー本体
- `server.test.ts`: 最低限の確認

## 9. 最初のページと API の雛形を作る

最初の段階では、次の 2 つがあると便利です。

- `/`
- `/api/health`

役割:

- `/`: ブラウザで開いたときに見える最初のページ
- `/api/health`: API が生きているか確認する入口

これは「最初の本物の機能」を作る前の土台になります。

## 10. 依存関係を入れる

`apps/web` に移動して、必要なパッケージを入れます。

```powershell
Set-Location apps/web
npm.cmd install
```

### なぜ `npm.cmd` を使うのか

PowerShell の設定によっては、`npm` がそのまま動かないことがあります。

そのときは `npm.cmd` を使えば進めやすいです。

## 11. `.env` を作る

`.env.example` をコピーして `.env` を作ります。

```powershell
Copy-Item .env.example .env
```

`.env` は本物の設定を書くファイルです。

大事なルール:

- `.env` は Git に入れない
- API キーやパスワードは `.env` に書く
- `.env.example` には見本だけ書く

## 12. 動作確認をする

次のコマンドで土台が正常か確認します。

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd test
npm.cmd run dev
```

意味:

- `typecheck`: TypeScript の型エラーがないか
- `build`: コンパイルできるか
- `test`: テストが通るか
- `dev`: 開発サーバーが起動するか

## 13. 最初のコミットを作る

土台ができたら、まず 1 回コミットします。

```powershell
git add .
git commit -m "chore: initialize project"
```

コミットは「今の状態の保存」です。

## 14. GitHub repo を作る

方法は 2 つあります。

### 方法 A: GitHub サイトで作る

1. GitHub で新しい repo を作る
2. リポジトリ名を決める
3. `Private` か `Public` を決める
4. 空の repo を作る

そのあと、ローカルから接続します。

```powershell
git remote add origin https://github.com/あなたの名前/リポジトリ名.git
git push -u origin main
```

### 方法 B: `gh` がある場合

```powershell
gh repo create リポジトリ名 --private --source . --remote origin --push
```

## 15. ふだんの開発は `main` ではなくブランチでやる

おすすめ:

```powershell
git switch -c feature/first-page
```

考え方:

- `main`: 安定した本体
- `feature/...`: 新しい作業

こうすると、失敗しても本体を守りやすいです。

## 16. Codex に最初に渡す指示の例

最初の依頼は、短く具体的にするのがコツです。

例:

```text
このリポジトリで開発を進めたいです。
Node.js + TypeScript で進めます。アプリ本体は apps/web にあります。

今回やってほしいこと:
apps/web に最初のトップページまたは最小の API を作ってください。
不要な変更は避けて、変更後は何を変えたかと確認結果を簡潔にまとめてください。
```

## 17. 今後 Python を追加するときの考え方

最初から Python を入れなくてよいです。

Python は必要になったときに追加します。

### Python を足すとよい場面

- AI や LLM の処理を入れたい
- PDF や CSV の処理をしたい
- バッチ処理を作りたい
- データ整理や集計をしたい
- Python のライブラリを使いたい

### 追加する場所

おすすめは `services/` の中です。

例:

```text
services/
  api/
    pyproject.toml
    app/
    tests/
```

この形にすると:

- Node.js は `apps/web`
- Python は `services/api`

と役割を分けられます。

## 18. Python をまだ足さない方がよい場面

次のようなときは、まだ Node.js だけで進めた方がよいです。

- 何を作るかまだ固まっていない
- とりあえず最初の画面を作りたい
- API の土台を先に作りたい
- Python の具体的な役割が決まっていない

理由:

- 2 つの言語を一度に管理するとむずかしくなる
- まず 1 つ動くものを作った方が早い

## 19. 将来 Python を足すときのおすすめ運用

### 役割分担の例

- `apps/web`: 画面、軽い API、フロント寄りの処理
- `services/api`: AI、データ処理、重い処理
- `contracts/`: 共通の API 仕様や JSON スキーマ

### コツ

- `package.json` と `pyproject.toml` を同じ場所に混ぜない
- Node.js と Python の `.env` を分ける
- 共通仕様は `contracts/` にまとめる

## 20. 毎日の運用ルール

開発を続けるときは、次の流れが安全です。

1. 最新の状態を確認する
2. 新しい作業ブランチを切る
3. 必要な変更をする
4. `typecheck`、`build`、`test` を回す
5. コミットする
6. GitHub に push する

例:

```powershell
git status
git switch -c feature/add-home-page
Set-Location apps/web
npm.cmd run typecheck
npm.cmd run build
npm.cmd test
Set-Location ../..
git add .
git commit -m "feat: add home page"
git push -u origin feature/add-home-page
```

## 21. よくあるミス

### ルートに全部置いてしまう

よくない例:

- ルートに `package.json`
- ルートに Python の設定
- ルートにいろいろなスクリプト

これを続けると、あとで見づらくなります。

### `.env` をコミットしてしまう

これは危険です。

API キーやパスワードが外に出ることがあります。

### `main` に直接どんどんコミットする

作業用ブランチを使った方が安全です。

### 何を作るか決めずに技術だけ増やす

Node.js と Python の両方を最初から入れると、管理が大変になります。

## 22. 困ったときの確認ポイント

### `npm` が動かない

`npm.cmd` を試します。

### push できない

次を確認します。

- GitHub にログインしているか
- `origin` が正しいか
- repo が存在するか

### Codex と CLI を両方使いたい

同じプロジェクトで使ってよいです。

ただし:

- 同時に大きな変更をしない
- こまめにコミットする
- ブランチを分けると安全

## 23. このマニュアルのおすすめ順

新しいプロジェクトを始めるときは、次の順で進めるのがおすすめです。

1. プロジェクトフォルダを作る
2. Codex デスクトップアプリで開く
3. `git init` する
4. `README.md`、`.gitignore`、`.env.example` を作る
5. `apps/web` に Node.js + TypeScript の土台を作る
6. 最初のページと API の雛形を作る
7. テストとビルドを確認する
8. コミットする
9. GitHub repo を作って push する
10. 作業ブランチで開発を始める

## 24. 最後に

最初から完璧にしなくて大丈夫です。

大事なのは次の 3 つです。

- まず 1 つ動くものを作る
- ファイルの置き場所を整理する
- あとで Python を足せる余白を残しておく

このマニュアルの形なら、最初は Node.js で軽く始めて、必要になったら Python を追加できます。

そのため、今後の運用まで考えると、とても育てやすい形です。

