$(function () {
    var id = utils.convertToObj(location.search.slice(1)).id;
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id,
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data);
                $('.setfr').html(htmlStr)
            }
        }
    })
})