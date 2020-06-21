$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('menuList', res)
                $('.menu .level_two').html('<li class="up"></li>' + htmlStr);
                $('.menu .left_menu').html(htmlStr);
            }
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.hotPic_news,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('mainList', res)
                $('.main_con .focus_list').html(htmlStr)
            }
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.latest_news,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('commonList', res);
                $('.common_news').html(htmlStr)
            }
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.hotrank_list,
        success(res) {
            console.log(res)
            var htmlStr = template('hotrankList', res)
            $('.hotrank_list').html(htmlStr)
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function (res) {
            console.log(res)
            var htmlStr = template('contentList', res)
            $('.comment_list').html(htmlStr)
        }
    })

    $.ajax({
        type: 'get',
        url: BigNew.attention_news,
        success: function (res) {
            console.log(res);
            var htmlStr = template('guanzhuList', res)
            $('.guanzhu_list').html(htmlStr)
        }
    })

    $('.search_btn').on('click', function () {
        if (!$('.search_txt').val().trim()) {
            alert('请重新输入')
            return;
        }
        window.location.href = './list.html?search=' + $('.search_txt').val();
        $('.search_txt').val('');
    })
})