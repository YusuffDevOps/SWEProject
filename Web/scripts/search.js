const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-query');
const searchResultsContainer = document.getElementById('search-results');

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
        try {
            // 发送搜索请求到后端服务器
            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            // 处理后端返回的搜索结果
            displaySearchResults(data.results, searchResultsContainer);
        } catch (error) {
            console.error('Search request error:', error);
        }
    }
});

// 定义一个函数，用于显示搜索结果
function displaySearchResults(results, container) {
    container.innerHTML = ''; // 清空容器

    if (results.length === 0) {
        container.innerHTML = '<p>No matching results found.</p>';
    } else {
        // 在此处将搜索结果显示在页面上
        // 您可以根据需求创建HTML元素来显示搜索结果
    }
}