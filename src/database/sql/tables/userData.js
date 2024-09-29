const query = `CREATE TABLE IF NOT EXISTS userData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    leetcode_username VARCHAR(255),
    github_username VARCHAR(255),
    codeforces_username VARCHAR(255),
    atcoder_username VARCHAR(255),
    codechef_username VARCHAR(255),
    hackerrank_username VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`


export default query;