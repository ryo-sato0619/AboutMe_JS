const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  //リクエストメソッドを確認
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  //リクエストボディを変換
  const data = JSON.parse(event.body);
  const { name, email, title, message } = data;

  //Nodemailerのトランスポーターを設定（環境変数を使用）
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, //環境変数に設定
      pass: process.env.EMAIL_PASS, //環境変数に設定
    },
  });

  //メールの内容を作成
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `${new Date().toLocaleDateString()} ${name}`,
    text: `
【お名前】
${name}

${email ? `【メールアドレス】
${email}
` : ''}【書籍名】
${title}

【メッセージ】
${message}
    `,
  };

  //メール送信
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', message: 'メールが送信されました。' }),
    };
  } catch (error) {
    console.error('メール送信エラー:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: 'メールの送信に失敗しました。' }),
    };
  }
};
