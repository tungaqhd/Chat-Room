const updateProgress = () => {
  const yes = $("[solved=yes]").length;
  const no = $("[solved=no]").length;
  console.log((yes * 100) / (yes + no));
  $("#progress").attr("aria-valuenow", (yes * 100) / (yes + no));
  $("#progress").attr("style", `width: ${(yes * 100) / (yes + no)}%`);
  $("#current_progress").html(`${(yes * 100) / (yes + no)}%`);
  if (no === 0) {
    $("#target").show();
  }
};
$(".go").click(function () {
  const url = $(this).attr("url");
  const win = window.open(url);
  win.focus();

  const task = this;
  let countDown = 6;
  let counter = setInterval(() => {
    if (win && !win.closed) {
      --countDown;
    } else {
      clearInterval(counter);
    }
    if (countDown == 0) {
      let checker = setInterval(() => {
        if (!win || win.closed) {
          $(task).attr("solved", "yes");
          $(task).attr("disabled", "yes");
          updateProgress();
          clearInterval(checker);
        }
      }, 100);
      clearInterval(counter);
    }
  }, 1000);
});
