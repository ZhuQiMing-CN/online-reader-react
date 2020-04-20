/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/14 17:08
 */
import axios from 'axios';

// 获取所有分类
export const category = (params) => {
    return axios.get('/api/cats/lv2/statistics', { params: params }).then(res => res.data);
};
// 获取分类下小类别
export const categoryList = () => {
    return axios.get('/api/cats/lv2').then(res => res.data);
};
// 根据分类获取小说列表
export const categoryListBook = (params) => {
    return axios.get('/api/book/by-categories', { params: params }).then(res => res.data);
};
// 获取排行榜类型
export const rankCategory = () => {
    return axios.get('/api/ranking/gender').then(res => res.data);
};
// 获取排行榜小说
export const rankListBook = (params) => {
    return axios.get('/api/ranking/' + params).then(res => res.data);
};
// 获取小说信息
export const bookInfo = (params) => {
    return axios.get('/api/book/' + params).then(res => res.data);
};
// 获取小说正版源于盗版源(混合)
export const bookSources = (params) => {
    return axios.get('/api/atoc', { params: params }).then(res => res.data);
};
// 获取小说章节(根据小说源id)
export const bookCatalog = (params) => {
    return axios.get('/api/atoc/' + params + '?view=chapters').then(res => res.data);
};
// 获取小说章节内容
export const bookChapter = (params) => {
    return axios.get('/chapter/' + encodeURIComponent(params)).then(res => res.data);
};
// 获取小说最新章节
export const bookUpdated = (params) => {
    return axios.get('/book', { params: params }).then(res => res.data);
};
// 搜索自动补充
export const searchAuto = (params) => {
    return axios.get('/api/book/auto-complete', { params: params }).then(res => res.data);
};
// 模糊搜索
export const searchFuzzy = (params) => {
    return axios.get('/api/book/fuzzy-search', { params: params }).then(res => res.data);
};
// 获取搜索热词
export const searchhotWords = () => {
    return axios.get('/api/book/search-hotwords').then(res => res.data);
};
