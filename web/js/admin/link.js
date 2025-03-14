Dropzone.options.dropzone = {
    paramName: 'LinkUploadForm[file]',
    acceptedFiles: 'image/jpeg,image/png',
    dictDefaultMessage: '<i class="fas fa-upload"></i> Перетащите изображения для загрузки',
    error: function (file, data) {
        if (data.ok) {
            return;
        }

        let message = 'Ошибка';

        if (data.errors && data.errors.file[0]) {
            message = data.errors.file[0];
        }

        $(file.previewElement).addClass("dz-error").find('.dz-error-message').text(message);
    },
};

$('[data-toggle="popover"]').popover();

$('.btn-remove').click(function (e) {
    e.preventDefault();

    const $photo = $(this).parents('.photo');
    const photoId = $photo.data('id');

    $.post(deletePhotoUrl, {id: photoId}, function (res) {
        console.log(res);

        if (!res.ok) {
            return alert('Ошибка при удалении фото');
        }

        $photo.fadeOut(function () {
            $photo.remove();
        });
    }, 'json');
});

if (window.innerWidth >= 768) {
    Sortable.create(document.getElementById('photos'), {
        onUpdate: function () {
            const photoIDs = [];

            $('#photos > .photo').each(function () {
                const id = +$(this).data('id');

                photoIDs.push(id);
            });

            console.log(photoIDs);

            $.post(orderPhotosUrl, {photoIDs: photoIDs}, function (res) {
                console.log(res);

                if (!res.ok) {
                    return alert('Не удалось сохранить порядок');
                }
            }, 'json');
        },
    });
}
