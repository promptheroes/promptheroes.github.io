document.onscroll = function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var headerShadow = document.getElementsByClassName("header");
  if (headerShadow) {
    if (scrollTop > 10)
      headerShadow[0].classList.replace("header-absolute", "header-fixed"); //替换
    else
      headerShadow[0].classList.replace("header-fixed", "header-absolute"); //替换
  }
}

feather.replace()

var tesObj = document.getElementsByName("carousel");
//设置 value 值为 0 选中
for (var i = 0; i < tesObj.length; i++) {
  if (tesObj[i].value == "0") {
    tesObj[i].checked = true;
    break;
  }
}

const createToast = (tip = "复制该 prompt 成功！马上去使用") => {
  // 创建toast
  var toast = document.createElement("div");
  toast.innerHTML = tip;
  toast.style.backgroundColor = "#212529";
  toast.style.color = "white";
  toast.style.padding = "20px 30px";
  toast.style.border = "none";
  toast.style.borderRadius = "4px";
  toast.style.position = "fixed";
  toast.style.top = "20%";
  toast.style.left = "50%";
  toast.style.transform = "translate(-50%, -50%)";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.remove();
  }, 2000);
}

const createShareToast = () => {
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) return
  // 先清除之前的
  document.querySelector(".social-share-container").innerHTML = ""
  document.querySelector("#qrcode").innerHTML = ""

  const shareUrl = location.href
  const qrcode = new QRCode('qrcode', { text: shareUrl, width: 256, height: 256 });

  const toast = document.getElementById("social-toast")
  toast.style.display = "flex";

  const close = document.getElementById("share-close")
  close.onclick = () => {
    qrcode.clear();
    toast.style.display = "none"
  }

  const title = document.querySelector(".article-title")?.innerText;
  const desc = document.querySelector("#Midjourney-Prompt-翻译+p")?.innerText;
  const image = document.querySelector("#AI-绘画-Midjourney-示意图+p>img")?.src;

  document.querySelector("#social-title").innerHTML = title;
  document.querySelector("#social-desc").innerHTML = desc;
  document.querySelector("#social-image img").src = image;
  document.querySelector("#shareUrl").value = shareUrl;
  document.querySelector("#shareUrl").onclick = () => {
    navigator.clipboard.writeText(shareUrl);
    createToast("复制成功！")
  }
  document.querySelector("#post-download").onclick = () => {
    const w = document.querySelector('.share-left').offsetWidth;
    const h = document.querySelector('.share-left').offsetHeight;
    domtoimage.toSvg(document.querySelector('.share-left')).then(function (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      var canvas = document.createElement("canvas");
      canvas.width = w * 4;
      canvas.height = h * 4;
      var ctx = canvas.getContext("2d");
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w * 4, h * 4);
        var link = document.createElement('a');
        link.download = 'PromptHeroes.jpg';
        link.href = canvas.toDataURL('image/jpeg', 1);
        link.click();
      }
    });
  }


  new SocialShare('.social-share-container', {
    qq: false,
    qzone: false,
    tieba: false,
    douban: false,
    wechat: false,
    // 定义通用的分享参数
    title: title,
    url: shareUrl,
    summary: desc,
    image: image,
    // 单独定义微博的分享参数,其它的同
    weibo: {
      sort: 1, // 排序参数，数字较小的展示在前面
      title: title,
      url: shareUrl,
      summary: desc,
      image: image,
    }
  });

  document.querySelector(".social-share-icon-weibo").innerHTML = `<span style="font-size: 16px;margin-left:6px;">微博</span>`
  document.querySelector(".social-share-icon-twitter").innerHTML = `<span style="font-size: 16px;margin-left:6px;">推特</span>`
  document.querySelector(".social-share-icon-facebook").innerHTML = `<span style="font-size: 16px;margin-left:6px;">脸书</span>`
}

const createCopyBtn = () => {
  // 创建复制按钮
  var copyBtn = document.createElement("button");
  copyBtn.classList = "copybtn";
  copyBtn.innerHTML = `
    <svg t="1683051919846" width="20" height="20" class="icon" fill="#FFF" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2659"><path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z" p-id="2660"></path><path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2661"></path><path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2662"></path></svg>
    <span>点击去复制</span>
  `;
  copyBtn.onclick = function () {
    var quoteText = document.querySelector(".article-inner blockquote").innerText;
    navigator.clipboard.writeText(quoteText);
    createToast()
  }

  return copyBtn
}

const createShareBtn = () => {
  const shareBtn = document.createElement("button");
  shareBtn.classList = "sharebtn";
  shareBtn.innerHTML = `
    <svg width="20" height="20" fill="#FFF" t="1682528128385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3476"><path d="M551.6 276V141.4c12.1-56.3 58.2-22 58.2-22L930 395.9c70.4 48.9 4.8 85.7 4.8 85.7L619.5 755.7c-63.1 46.5-67.9-24.5-67.9-24.5V606.4C231.4 506.1 100.4 907.5 100.4 907.5c-12.1 22-19.4 0-19.4 0C-42.8 305.4 551.6 276 551.6 276z" p-id="3477"></path></svg>
    <span>海报分享</span>
  `;
  shareBtn.onclick = function () {
    createShareToast()
  }
  return shareBtn
}

const createBtnWrap = () => {
  const btnWrap = document.createElement("div");
  btnWrap.classList = "btnwrap";
  btnWrap.appendChild(createCopyBtn())
  if (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    // 当前设备是移动设备
    btnWrap.appendChild(createShareBtn())
  }
  const blockquote = document.querySelector(".article-inner blockquote")
  if (blockquote) blockquote.insertAdjacentElement('afterend', btnWrap);
}

createBtnWrap()

const createChineseCopyBtn = () => {
  // 创建复制按钮
  var copyBtn = document.createElement("button");
  copyBtn.classList = "copybtn";
  copyBtn.innerHTML = `
    <svg t="1683051919846" width="20" height="20" class="icon" fill="#FFF" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2659"><path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z" p-id="2660"></path><path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2661"></path><path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2662"></path></svg>
    <span>点击去复制</span>
  `;
  copyBtn.onclick = function () {
    var chineseText = document.querySelector("#Midjourney-Prompt-翻译+p").innerText;
    navigator.clipboard.writeText(chineseText);
    createToast()
  }
  return copyBtn
}

const createChineseBtnWrap = () => {
  const btnWrap = document.createElement("div");
  btnWrap.classList = "btnwrap";
  btnWrap.appendChild(createChineseCopyBtn())
  const blockquote = document.querySelector("#Midjourney-Prompt-翻译+p")
  if (blockquote) blockquote.insertAdjacentElement('afterend', btnWrap);
}
createChineseBtnWrap()