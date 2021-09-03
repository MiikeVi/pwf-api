import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialPost, SocialPostDocument } from 'src/schemas/social-post.schema';

@Injectable()
export class SocialPostService {
  constructor(
    @InjectModel(SocialPost.name)
    private socialPostModel: Model<SocialPostDocument>,
  ) {}
}
