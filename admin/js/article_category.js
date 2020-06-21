$(function () {
    function render() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('category', res);
                    $('tbody').html(htmlStr)
                }
            }
        })
    }
    render();

    $('#myModal').on('show.bs.modal', function (e) {
        if ($(e.relatedTarget).attr('id') == "xinzengfenlei") {
            $('#myForm')[0].reset();
            $('modal-header .modal-title').text('新增文章分类')
        } else {
            $('modal-header .modal-title').text('修改文章分类');
            $.ajax({
                type: 'get',
                url: BigNew.category_search,
                data: {
                    id: $(e.relatedTarget).data('id'),
                },
                success: function (res) {
                    console.log(res)
                    if (res.code == 200) {
                        $('#myForm input[name="id"]').val(res.data[0].id)
                        $('#myForm input[name="name"]').val(res.data[0].name)
                        $('#myForm input[name="slug"]').val(res.data[0].slug)
                    }
                }
            })
        }
    })

    $('.modal-footer .btn-sure').on('click', function () {
        var id = $('#myForm input[name=id]').val();
        $.ajax({
            type: 'post',
            url: id ? BigNew.category_edit : BigNew.category_add,
            data: $('#myForm').serialize(),
            success: function (res) {
                if (res.code == 200 || res.code == 201) {
                    $('.addModal').modal('hide');
                    render();
                }
            }
        })
    })

    $('#delModal').on('show.bs.modal', function (e) {
        window.delModal = $(e.relatedTarget).data('id');
    })
    $('#delModal').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: delModal,
            },
            success: function (res) {
                if (res.code == 204) {
                    $('.delModal').modal('hide');
                    render();
                }
            }
        })
    })
})