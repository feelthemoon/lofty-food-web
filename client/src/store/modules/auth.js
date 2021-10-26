import auth from '@/api/modules/auth.js';

export default {
    actions: {
        async authorization({commit}, code) {
            try{
                const res = await auth(code);
                if (res.data.id_token) {
                    commit('SET_TOKEN', res.data.id_token, {root: true})
                }
            }catch (e) {
                console.log(e);
            }
        }
    }
}