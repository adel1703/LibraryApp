using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace libraryBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class updateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "BooksLoan",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "BooksLoan",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BooksLoan_BookId",
                table: "BooksLoan",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_BooksLoan_StudentId",
                table: "BooksLoan",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_BooksLoan_Books_BookId",
                table: "BooksLoan",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BooksLoan_Students_StudentId",
                table: "BooksLoan",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BooksLoan_Books_BookId",
                table: "BooksLoan");

            migrationBuilder.DropForeignKey(
                name: "FK_BooksLoan_Students_StudentId",
                table: "BooksLoan");

            migrationBuilder.DropIndex(
                name: "IX_BooksLoan_BookId",
                table: "BooksLoan");

            migrationBuilder.DropIndex(
                name: "IX_BooksLoan_StudentId",
                table: "BooksLoan");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "BooksLoan");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "BooksLoan");
        }
    }
}
