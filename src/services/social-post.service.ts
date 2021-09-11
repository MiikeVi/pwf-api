import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialPost, SocialPostDocument } from 'src/schemas/social-post.schema';
import { Entity } from 'src/types';

@Injectable()
export class SocialPostService {
  constructor(
    @InjectModel(SocialPost.name)
    private socialPostModel: Model<SocialPostDocument>,
  ) {}

  async findAll(
    query: any,
    page: number,
    limit: number,
    count: boolean,
  ): Promise<Entity<SocialPost>> {
    const socialPostData: SocialPost[] = await this.socialPostModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!socialPostData)
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'No social posts found',
      );

    if (!count) return { values: socialPostData };

    const countDocs: number = await this.socialPostModel
      .countDocuments(query)
      .then((count) => count)
      .catch((err) => {
        throw Error(err);
      });

    return { values: socialPostData, count: countDocs };
  }

  async find(id: string): Promise<SocialPost> {
    const socialPost = await this.socialPostModel.findById(id).exec();

    if (!socialPost) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no post with that id',
      );
    }

    return socialPost;
  }

  async create(socialPostDto: SocialPost): Promise<SocialPost> {
    const createdSocialPost = new this.socialPostModel(socialPostDto);
    if (!createdSocialPost)
      throw new ConflictException(HttpStatus.CONFLICT, 'Cannot save post');

    return createdSocialPost.save();
  }
}
