$("#add").click(() => {
  $("#actions").append(`
              <div class="action">
                <div class="row">
                  <div class="col-md-5">
                    <div class="form-group">
                      <select class="form-control type" name="type[]">
                        <option value="youtube">Youtube Follow</option>
                        <option value="twitter">Twitter Follow</option>
                        <option value="instagram">Instagram Follow</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="form-group">
                      <input type="text" name="url[]" class="form-control url" placeholder="">
                    </div>
                  </div>
                  <div class="col-md-2">
                    <button type="button" class="btn btn-warning" onclick="$(this).parent('div').parent('div').remove();"><i class="far fa-trash-alt"></i></button>
                  </div>
                </div>
              </div>`);
});

const preview = () => {
  let urlTypes = [],
    urls = [];
  $("select").each((i, select) => {
    urlTypes.push($(select).children("option:selected").val());
  });
  $(".url").each((i, url) => {
    urls.push($(url).val());
  });

  let newPreview = "";
  urlTypes.map((value, index) => {
    if (value === "youtube") {
      newPreview += `<button class="btn btn-sm btn-block ${value}"><i class="fab fa-youtube"></i> Follow Youtube</button>`;
    } else if (value === "twitter") {
      newPreview += `<button class="btn btn-sm btn-block ${value}"><i class="fab fa-twitter"></i> Follow Twitter</button>`;
    } else {
      newPreview += `<button class="btn btn-sm btn-block ${value}"><i class="fab fa-instagram"></i> Follow Instagram</button>`;
    }
  });

  let youtubeVideoUrl = $('#youtube_video').val();
  youtubeVideoUrl = youtubeVideoUrl.replace('watch?v=', 'embed/');
  if(youtubeVideoUrl.length !== 0) {
    $('#videoPreview').html(`<iframe width="320" height="200" src="${youtubeVideoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
  }

  $('#subtitlePreview').text($('#subtitle').val());
  $('#titlePreview').text($('#title').val());
  $("#preview").html(newPreview);
};