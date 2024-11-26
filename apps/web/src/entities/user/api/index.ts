import { apiService } from "@/shared/api";
import { User } from "../model/user";
import { User as ApiUser, ApiContract, Maybe } from "@cloud/shared";

export async function getMe(): Promise<Maybe<User>> {
    try {
        const res = await apiService.get<ApiUser>({
            url: ApiContract.auth.me.path,
        });

        return User.fromApiResponse(res.body);
    } catch (err) {
        console.log(err);
    }
}
