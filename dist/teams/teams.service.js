"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./entities/team.entity");
const typeorm_2 = require("@nestjs/typeorm");
let TeamsService = class TeamsService {
    constructor(teamsRepository) {
        this.teamsRepository = teamsRepository;
    }
    async verifyTeam({ name }) {
        return !!(await this.teamsRepository.findOne({ name }));
    }
    async create(team) {
        if (!(await this.verifyTeam(team))) {
            return await this.teamsRepository.save(team);
        }
        throw new common_1.BadRequestException('team already exists');
    }
    async findAll() {
        return await this.teamsRepository.find();
    }
    async findOne(id) {
        const team = await this.teamsRepository.findOne({ where: { id } });
        if (!team) {
            throw new common_1.BadRequestException('Team not found');
        }
        return team;
    }
    async update(id, updateTeamDto) {
        const team = await this.findOne(id);
        if (!team) {
            throw new common_1.BadRequestException('Team not found');
        }
        if (await this.verifyTeam(updateTeamDto)) {
            throw new common_1.BadRequestException('Team name already exists');
        }
        return this.teamsRepository.save(Object.assign(Object.assign({}, team), updateTeamDto));
    }
    async remove(id) {
        const isExists = await this.teamsRepository.findOne({ where: { id } });
        if (!isExists) {
            throw new common_1.BadRequestException('Team not found');
        }
        await this.teamsRepository.delete(id);
    }
};
TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TeamsService);
exports.TeamsService = TeamsService;
//# sourceMappingURL=teams.service.js.map