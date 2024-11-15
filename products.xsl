<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <html>
            <head>
                <title>Product List</title>
                <xsl:element name="link">
                    <xsl:attribute name="rel">icon</xsl:attribute>
                    <xsl:attribute name="type">image/x-icon</xsl:attribute>
                    <xsl:attribute name="href">/images/logo.png</xsl:attribute>
                </xsl:element>
                <link rel="stylesheet" type="text/css" href="style.css"/>
            </head>
            <body>
                <!-- Navbar -->
                <nav>
                    <h1>Aviana</h1>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="products.xml">Products</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>

                <h2>Aviation Products List</h2>

                <!-- Search bar -->
                <div class="search-container">
                    <input type="text" id="search" placeholder="Search products..." />
                </div>

                <!-- Product Table -->
                <table id="productTable">
                    <tr>
                        <th>Product Code</th>
                        <th>Name</th>
                        <th>Stock Status</th>
                        <th>Expiration Date</th>
                        <th>Unit Price</th>
                        <th>Ratings</th>
                    </tr>
                    <xsl:for-each select="products/product">
                        <tr>
                            <td><xsl:value-of select="@code"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="stockStatus"/></td>
                            <td><xsl:value-of select="expirationDate"/></td>
                            <td><xsl:value-of select="unitPrice"/></td>
                            <td><xsl:value-of select="ratings"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
                <script src="script.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
