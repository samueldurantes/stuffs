const loadFile = (event) => $('#image').attr('src', window.URL.createObjectURL(event.target.files[0]))

const readImage = (image) => Jimp.read({ url: typeof image !== 'string' ? image.attr('src') : image })
const updateImage = async (image, source) => image.attr('src', await source.getBase64Async('image/jpeg'))

const presets = {
  async blur (source) {
    const image = await readImage(source)

    image.blur(5)

    updateImage(source, image)
  },

  async gay (source) {
    const image = await readImage(source)
    const filter = await readImage('https://files.catbox.moe/039lwq.png')

    filter.resize(image.bitmap.width, image.bitmap.height)
    image.composite(filter, 0, 0)

    updateImage(source, image)
  },

  async mario (source) {
    const image = await readImage(source)
    const background = await readImage('https://files.catbox.moe/w920tv.jpg')

    image.resize(180, 180)
    background.composite(image, 100, 80)

    updateImage(source, background)
  }
}

const editor = () => presets[$('#select').val().toLowerCase()]($('#image'))
