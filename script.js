fetch('data/nogizaka_profile.json')
  .then(response => response.json())
  .then(data => {
    const members = data[0]["メンバー"];
    const list = document.getElementById('memberList');

    members.forEach((member, index) => {
      // const li = document.createElement('li');

      // const link = document.createElement('a');
      // link.href = `member.html?index=${index}`;
      // link.textContent = member.名前;
      // // link.className = 'member-link';

      // const yomi = document.createElement('span');
      // yomi.className = 'yomigana';
      // yomi.textContent = `（${member.よみがな}）`;

      const tr = document.createElement('tr');

      const nameTd = document.createElement('td');
      const link = document.createElement('a');
      link.href = `member.html?index=${index}`;
      link.textContent = member.名前;
      // link.className = 'body-index';
      nameTd.appendChild(link);


      const yomiTd = document.createElement('td');
      yomiTd.className = 'yomigana';
      yomiTd.textContent = "　　("+member.よみがな+")";


      list.appendChild(nameTd);
      list.appendChild(yomiTd);
      // list.appendChild(li);
      list.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('読み込みエラー:', error);
  });
