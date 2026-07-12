# Wedding Invitation — 西川将広 & 由香

軽井沢「星野リゾート 軽井沢ホテルブレストンコート」での結婚式（2026.09.06）のためのWeb招待状です。
GitHub Pagesで無料公開できる、完全な静的サイト（HTML / CSS / Vanilla JavaScriptのみ）として作られています。サーバーやデータベースは不要です。

```
wedding-invitation/
├── index.html              ← トップページ（このファイルがサイトの入口です）
├── README.md                ← この説明書
└── assets/
    ├── css/
    │   └── style.css        ← デザイン
    ├── js/
    │   └── script.js         ← RSVPボタンの設定など
    └── images/
        ├── hero.jpg          ← 表紙の写真（仮画像・要差し替え）
        ├── venue.jpg         ← 会場セクションの写真（仮画像・要差し替え）
        ├── ogp.jpg           ← LINE等でURLを共有した時に表示される画像（1200×630px）
        └── favicon.png       ← ブラウザタブに表示される小さいアイコン
```

---

## 1. 公開前に必ず編集する項目

サイトはそのままでも表示できますが、**下記は公開前に必ず差し替えてください。**

### 写真を差し替える（最重要）

`assets/images/` の中の `hero.jpg` と `venue.jpg` は、現時点では仮の画像（グラデーションのプレースホルダー）です。同じファイル名のまま、お手持ちの写真で上書き保存してください。コードの編集は不要です。

- `hero.jpg`：推奨サイズ 1600×2100px程度（縦長・スマホの画面いっぱいに表示されます）
- `venue.jpg`：推奨サイズ 1600×1067px程度（横長）
- `ogp.jpg`：**必ず1200×630px**で作成してください（LINEやInstagramでのシェア時に使われます）

### 出欠フォームのURLを設定する

`assets/js/script.js` を開き、下記の部分を、Googleフォームで作成したご自身のフォームURLに書き換えてください。

```js
const weddingConfig = {
  rsvpFormUrl: "https://forms.gle/XXXXXXXX", // ← ここを書き換える
};
```

URLが仮のままの場合、「出欠を回答する」ボタンは押しても反応しないようになっています（誤って空のリンク先に案内しないための安全対策です）。

### 本文・スケジュール・メッセージを確認する

`index.html` 内の下記はすべて仮の内容で作成しています。実際の内容に合わせて修正してください。

- Message欄の挨拶文
- Schedule欄の時間（受付10:00 / 挙式10:30 / 披露宴12:00 / お開き14:30 は仮の時間です）
- Venueの住所・アクセス
- OGP用の説明文（`index.html` 冒頭の `<meta property="og:description" ...>` 部分）

---

## 2. GitHub Pagesで公開する手順（初めての方向け）

専門知識がなくても大丈夫です。順番に進めてください。

### 手順1：GitHubアカウントを作成する

1. [https://github.com](https://github.com) にアクセスします。
2. 「Sign up」からメールアドレス・パスワード・ユーザー名を登録します。
3. 確認メールが届いたら案内に従ってアカウントを有効化します。

### 手順2：新しいリポジトリを作成する

1. GitHubにログインした状態で、右上の「+」→「New repository」を選びます。
2. 「Repository name」に **`wedding-invitation`** と入力します。
3. 「Public」を選択します（Privateだと無料のGitHub Pagesが使えない場合があります）。
4. 「Create repository」をクリックします。

### 手順3：作成したファイルをアップロードする

1. 作成したリポジトリのページで「uploading an existing file」というリンク（または「Add file」→「Upload files」）をクリックします。
2. このフォルダの中身（`index.html`、`README.md`、`assets` フォルダごと）をドラッグ＆ドロップします。
   - **フォルダごと**ドラッグしてください（`index.html` がリポジトリの一番上の階層に来るようにします）。
3. 下部の「Commit changes」をクリックしてアップロードを確定します。

### 手順4：GitHub Pagesを有効にする

1. リポジトリ画面上部の「Settings」タブを開きます。
2. 左メニューの「Pages」を開きます。
3. 「Build and deployment」の「Source」で **「Deploy from a branch」** を選択します。
4. 「Branch」を **「main」**、フォルダを **「/ (root)」** に設定します。
5. 「Save」を押します。

### 手順5：公開されたURLを確認する

1. 数分待ってから、再度「Settings」→「Pages」を開きます。
2. ページ上部に「Your site is live at `https://ユーザー名.github.io/wedding-invitation/`」と表示されればURLが有効です。
3. そのURLにブラウザでアクセスし、表示を確認します。

### 手順6：LINEで表示を確認する

1. 発行されたURLをコピーします。
2. LINEの自分のトーク（メモなど）に貼り付けて開き、表示・OGP画像・文字崩れがないか確認します。
3. スマートフォンからも実際にアクセスして、写真やレイアウトが崩れていないか確認します。

> **公開直後はOGP画像（LINEのプレビュー画像）が反映されないことがあります。** その場合は数分〜半日ほど時間を置くか、URLの末尾に `?v=2` のような文字を仮に付けて再度共有すると更新されることがあります。

---

## 3. Claude CodeからGitHubへアップロードする場合のコマンド

ターミナル（Claude Codeなど）から直接アップロードしたい場合は、このフォルダの中で以下を順番に実行してください。`ユーザー名` の部分はご自身のGitHubユーザー名に置き換えてください。

```bash
git init
git add .
git commit -m "Create wedding invitation website"
git branch -M main
git remote add origin https://github.com/ユーザー名/wedding-invitation.git
git push -u origin main
```

実行後、GitHubのリポジトリ画面にファイルが反映されているか確認し、上記「手順4：GitHub Pagesを有効にする」に進んでください。

公開後のURL例：

```
https://ユーザー名.github.io/wedding-invitation/
```

### サイトを修正した後の更新方法

写真の差し替えや文章の修正をした後は、同じフォルダで以下を実行するだけで反映されます。

```bash
git add .
git commit -m "Update wedding invitation"
git push
```

反映まで数分ほどかかることがあります。

---

## 4. 公開前チェックリスト（ゲストに送る前に必ず確認）

実際に招待状としてゲストへ送る前に、以下を確認することを強くおすすめします。誤った情報のまま送信すると、あとから全員に訂正の連絡が必要になり手間が増えてしまいます。

- [ ] `hero.jpg` / `venue.jpg` / `ogp.jpg` を実際の写真に差し替えた
- [ ] `script.js` の `rsvpFormUrl` を実際のGoogleフォームURLに書き換えた
- [ ] Googleフォーム自体を自分で一度テスト回答し、回答が正しく記録・通知されるか確認した
- [ ] 新郎新婦の名前・挙式日・会場名・住所に誤字がないか確認した
- [ ] Scheduleの時間を実際の時間に修正した
- [ ] 公開後のURLを自分のLINE（自分だけのトークやメモ）に貼り、OGP画像・表示崩れがないか確認した
- [ ] スマートフォン（できれば複数機種）で実際に開いて確認した
- [ ] 家族や親しい友人など少人数に先にURLを送り、問題ないか確認してから全ゲストへ共有した

---

## 5. データの取り扱いについて

- このサイトは出欠情報や個人情報をサイト内・GitHub上に保存しません。
- 「出欠を回答する」ボタンは、外部のGoogleフォーム（またはGoogle Apps Script）へ移動するだけです。回答データはGoogle側で管理されます。
- リポジトリは公開（Public）設定が必要なため、`index.html` や `script.js` の中身は誰でも閲覧可能です。氏名・住所・電話番号などの個人情報をコード内に直接書き込まないようご注意ください（本サイトのテンプレートでは新郎新婦のお名前・挙式日・会場名のみを掲載する想定にしています）。
