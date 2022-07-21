import { useRoute } from 'vue-router';
export default function useQueryParams() {
    return useRoute().query
}