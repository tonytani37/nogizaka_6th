const urlParams = new URLSearchParams(window.location.search);
const index = parseInt(urlParams.get('index'), 10);

fetch('nogizaka_profile.json')
  .then(response => response.json())
  .then(data => {
    const members = data[0]["メンバー"];
    const member = members[index];
    const container = document.getElementById('memberDetail');

    if (!member) {
      container.textContent = 'メンバーが見つかりません。';
      return;
    }

    // 年齢計算
    let ageText = '';
    if (member["生年月日"]) {
      const birthDate = new Date(member["生年月日"]);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      ageText = `${age}歳`;
    }

    // 左側（テキスト）エリア
    const infoDiv = document.createElement('div');
    infoDiv.className = 'member-info';

    const nameEl = document.createElement('h1');
    nameEl.className = 'member-name';
    nameEl.textContent = member["名前"];

    const yomiEl = document.createElement('div');
    yomiEl.className = 'member-yomi';
    yomiEl.textContent = member["よみがな"]+"　　　("+member["組"]+"組)";

    const table = document.createElement('table');
    table.className = 'member-table';

    // 表示項目の順序を定義（imageは除外）
    const displayOrder = [
      ["コール名", member["コール名"]],
      ["サイリウムカラー", member["サイリウムカラー"]],
      ["生年月日", member["生年月日"]],
      ["年齢", ageText],
      ["血液型", member["血液型"]],
      ["星座", member["星座"]],
      ["身長", member["身長"] ? `${member["身長"]}cm` : ""],
      ["出身地", member["出身地"]],
      ["好きな食べ物", member["好きな食べ物"]],
      ["長所", member["長所"]],
      ["短所", member["短所"]],
      ["好きな乃木坂楽曲", member["好きな乃木坂楽曲"]],
      ["好きな乃木坂MV", member["好きな乃木坂MV"]],
    ];

    displayOrder.forEach(([label, value]) => {
      if (value) {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        const td = document.createElement('td');
        th.textContent = label;
        td.textContent = value;
        row.appendChild(th);
        row.appendChild(td);
        table.appendChild(row);
      }
    });

    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(yomiEl);
    infoDiv.appendChild(table);

    // 右側（画像）エリア
    const imageDiv = document.createElement('div');
    imageDiv.className = 'member-image';
    if (member.image) {
      const img = document.createElement('img');
      img.src = member.image;
      img.alt = member["名前"];
      imageDiv.appendChild(img);
    }

    container.appendChild(infoDiv);
    container.appendChild(imageDiv);
  })
  .catch(error => {
    console.error('読み込みエラー:', error);
  });
