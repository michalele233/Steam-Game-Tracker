import { useEffect, useState } from "react";

export default function ImageComponent({ src, alt, ...props }) {
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const image = new Image();
		image.onload = () => {
			setImageLoaded(true);
		};
		image.src = src;
	}, []);
	return <img src={src} alt={alt} {...props} />;
}
