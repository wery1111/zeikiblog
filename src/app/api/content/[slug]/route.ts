import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

// 内容目录路径
const contentPath = join(process.cwd(), 'outstatic/content');

/**
 * GET 请求处理器 - 获取特定 slug 的内容
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') || 'posts';
    const slug = params.slug;
    
    // 读取特定集合的内容目录
    const collectionPath = join(contentPath, collection);
    
    try {
      const files = readdirSync(collectionPath);
      
      // 查找匹配 slug 的文件
      for (const file of files) {
        const fileContent = readFileSync(join(collectionPath, file), 'utf8');
        
        try {
          const content = JSON.parse(fileContent);
          
          // 如果内容的 slug 匹配请求的 slug，返回该内容
          if (content.slug === slug) {
            return NextResponse.json(content);
          }
        } catch (e) {
          // 跳过无效的 JSON 文件
          continue;
        }
      }
      
      // 未找到匹配的内容
      return NextResponse.json({ error: `Content with slug '${slug}' not found` }, { status: 404 });
    } catch (error) {
      // 集合目录不存在
      return NextResponse.json({ error: `Collection '${collection}' not found` }, { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 