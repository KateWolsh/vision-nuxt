<template>
    <article>
        <label :for="name" v-if="!uploadedFile">
            {{ this.file ? this.file.name : 'Выбрать файл' }}
        </label>
        <label :for="name" v-else>
            <img v-if="getIsFileImage"
                 :src="uploadedFile">
            <span v-else>
                {{ uploadedFile }}
            </span>
        </label>
        <input type="file" @change="fileUpload" :id="name">
    </article>
</template>

<script>
import {FileService} from "~/services/FileService";

export default {
    name: "AdminFileInput",
    props: {
        name: {
            type: String,
            required: true
        },
        uploadedFile: {
            type: String,
            required: false,
            default: ''
        }
    },
    IMAGES_EXTENSIONS: [
        'png', 'jpg', 'jpeg', 'webp', 'svg'
    ],
    data() {
        return {
            file: null,
        }
    },
    methods: {
        fileUpload(e) {
            this.file = e.target.files.length ? e.target.files[0] : null
            FileService.upload(this.file).then(({data, res}) => {
                if (!!res && res.status === 201 && data.length) {
                    this.$emit('fileUpload', data[0])
                }
            })
        }
    },
    computed: {
        getIsFileImage() {
            if (!this.uploadedFile) {
                return false
            }
            return this.$options.IMAGES_EXTENSIONS.some((ext) => {
                return this.uploadedFile.includes(ext)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
article {
    display: flex;

    > label {
        text-align: center;
        width: 100%;
        padding: 1rem;
        color: $fontColor;
        cursor: pointer;
        border: 1px dashed $accentBlue;
        margin-bottom: 1rem;

        > img {
            width: 100%;
            height: 6rem;
            object-fit: contain;
            object-position: center;
        }
    }

    > input[type="file"] {
        display: none;
    }
}
</style>
