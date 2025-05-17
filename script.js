fetch('nogizaka_profile.json')
  .then(response => response.json())
  .then(data => {
    const members = data[0]["メンバー"];
    const list = document.getElementById('memberList');
    console.log(members);

    members.forEach((member, index) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `member.html?index=${index}`;
      link.textContent = member.名前;
      li.appendChild(link);
      li.append(`（${member.よみがな}）`);
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('読み込みエラー:', error);
  });
