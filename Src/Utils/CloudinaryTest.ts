// utils/CloudinaryTest.ts
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: "dgefyn8qd" // Your cloud name
  }
});

console.log("✅ Cloudinary setup successful!");
console.log("Cloud Name:", "dgefyn8qd");

export default cld;
