export class Image {
    id!: number;
    url!: string;
    width!: number;
    height!: number;
    altText!: string;

    constructor(Image?:any) {
        this.id = Image.id;
        this.url = Image.url;
        this.width = Image.width;
        this.height = Image.height;
        this.altText = Image.altText;
    }
}
