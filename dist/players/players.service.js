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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const team_entity_1 = require("../teams/entities/team.entity");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./entities/player.entity");
let PlayersService = class PlayersService {
    constructor(playersRepository, teamsRepository) {
        this.playersRepository = playersRepository;
        this.teamsRepository = teamsRepository;
    }
    async verifyPlayer({ name }) {
        return !!(await this.playersRepository.findOne({ name }));
    }
    async verifyTeam(id) {
        return await this.teamsRepository.findOne({ id });
    }
    async create(createPlayerDto) {
        const team = await this.verifyTeam(createPlayerDto.teamId);
        if (!team)
            throw new common_1.BadRequestException('Team not found');
        if (await this.verifyPlayer(createPlayerDto))
            throw new common_1.BadRequestException('Player already exists');
        const player = Object.assign(new player_entity_1.Player(), Object.assign(Object.assign({}, createPlayerDto), { team }));
        return await this.playersRepository.save(player);
    }
    async findAll() {
        return await this.playersRepository.find();
    }
    async findAllPlayersInTeam(id) {
        const team = await this.verifyTeam(id);
        if (!team)
            throw new common_1.BadRequestException('Team not found');
        return await this.playersRepository.find({ where: { team } });
    }
    async findOne(id) {
        const player = await this.playersRepository.findOne({ where: { id } });
        if (!player) {
            throw new common_1.BadRequestException('Player not found');
        }
        return player;
    }
    async update(id, updatePlayerDto) {
        const player = await this.findOne(id);
        if (!player) {
            throw new common_1.BadRequestException('Player not found');
        }
        if (await this.verifyPlayer(updatePlayerDto)) {
            throw new common_1.BadRequestException('Player name already exists');
        }
        return this.playersRepository.save(Object.assign(Object.assign({}, player), updatePlayerDto));
    }
    async remove(id) {
        const isExists = await this.playersRepository.findOne({
            where: { id },
        });
        if (!isExists) {
            throw new common_1.BadRequestException('Player not found');
        }
        await this.playersRepository.delete(id);
    }
};
PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(1, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PlayersService);
exports.PlayersService = PlayersService;
//# sourceMappingURL=players.service.js.map