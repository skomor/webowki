using AutoMapper;
using BackDoAPIN.Dtos;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}