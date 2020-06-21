$(function () {
    var params = location.search;
    console.log(params);
    if (!params) {
        window.location.href = './index.html';
        return;
    }
    var obj = utils.convertToObj(params.slice(1));
    if (obj.id) {
        var data = { type: obj.id }
    } else {
        var data = { key: decodeURI(obj.search) }
    }
    console.log(data)
    $.ajax({
        type: 'get',
        url: BigNew.artilce_list,
        data: data,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                if (!res.data.data.length) {
                    $('.setfr').html(`<div class="list_title">
              <h3>暂时没有数据</h3>
                 </div>`)
                } else {
                    if (obj.id) {
                        var str = `<div class="list_title">
              <h3>${res.data.data[0].category}</h3>
                 </div>`
                    } else {
                        var str = `<div class="list_title">
              <h3>${decodeURI(obj.search)}</h3>
                 </div>`
                    }
                    var htmlStr = template('articleList', res.data)
                    $('.setfr').html(str + htmlStr)
                }
            }
        }
    })
})