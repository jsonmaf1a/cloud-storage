import { InfinitePaginationResponseDto } from "@/common/dto/infinite-pagination-response.dto";
import { ExposeGroup } from "@/common/enums/expose-group";
import { infinitePagination } from "@/common/utils/infinite-pagination";
import { Nullable } from "@cloud/shared";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    SerializeOptions,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import { User } from "./domain/user";
import { CreateUserDto } from "./dto/create-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("Users")
@Controller({
    path: "users",
    version: "1",
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiCreatedResponse({
        type: User,
    })
    @SerializeOptions({
        groups: [ExposeGroup.Self],
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.create(dto);
    }

    @ApiOkResponse({
        type: User,
    })
    @SerializeOptions({
        groups: [ExposeGroup.Self],
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() query: QueryUserDto,
    ): Promise<InfinitePaginationResponseDto<User>> {
        const page = query?.page ?? 1;
        let limit = query?.limit ?? 10;
        if (limit > 50) {
            limit = 50;
        }

        return infinitePagination(
            await this.usersService.findManyWithPagination({
                sortOptions: query?.sort,
                paginationOptions: {
                    page,
                    limit,
                },
            }),
            { page, limit },
        );
    }

    @ApiOkResponse({
        type: User,
    })
    @SerializeOptions({
        groups: [ExposeGroup.Admin],
    })
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: "id",
        type: String,
        required: true,
    })
    findOne(@Param("id") id: User["id"]): Promise<Nullable<User>> {
        return this.usersService.findById(id);
    }

    @ApiOkResponse({
        type: User,
    })
    @SerializeOptions({
        groups: [ExposeGroup.Admin],
    })
    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: "id",
        type: String,
        required: true,
    })
    update(
        @Param("id") id: User["id"],
        @Body() dto: UpdateUserDto,
    ): Promise<User | null> {
        return this.usersService.update(id, dto);
    }

    @Delete(":id")
    @ApiParam({
        name: "id",
        type: String,
        required: true,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id") id: User["id"]): Promise<void> {
        return this.usersService.remove(id);
    }
}
