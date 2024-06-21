import { onMounted, ref } from "vue";

export default function useMediaQuery(query: string) {
	const match = ref(false);

	const getMatches = (query: string) => {
		return window.matchMedia(query).matches;
	};

	const handleChange = () => {
		match.value = getMatches(query);
	};
	onMounted(() => {
		const mediaQuery = window.matchMedia(query);
		match.value = mediaQuery.matches;
		mediaQuery.addEventListener("change", handleChange);
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	});

	return match;
}
